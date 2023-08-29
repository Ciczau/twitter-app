import { ObjectId } from 'mongodb';
import { db } from '../database/mongo.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';
import { notifications } from './notifications.js';
import { Users } from './users.js';
cloudinary.config({
    cloud_name: 'df4tupotg',
    api_key: '626447796253867',
    api_secret: 'mPXy5pytK8szulO6NY69mlAtP8Y',
});

export function generateRandomCode() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}
export const tweets = db.collection('tweets');
const likes = db.collection('likes');
const users = db.collection('users');
const bookmarks = db.collection('bookmarks');
export const postTweet = async (req, res) => {
    try {
        const { file } = req;
        const { nick, text, parentId } = req.body;
        let reply = 0;
        const user = await users.findOne({ nick: nick });
        let notification = {
            nick: '',
            type: 'retweet',
            date: '',
            user: null,
            content: null,
        };
        if (parentId) {
            reply = 1;
            console.log(parentId);
            const id = new ObjectId(parentId);
            const parentTweet = await tweets.findOne({ _id: id });
            await tweets.updateOne(
                { _id: id },
                { $set: { retweets: parentTweet.retweets + 1 } }
            );
            notification.nick = parentTweet.nick;
            notification.user = user;
            notification.user.avatarId = `https://res.cloudinary.com/df4tupotg/image/upload/${notification.user.avatarId}`;
        }
        const imageId = generateRandomCode();
        console.log(reply);
        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                public_id: imageId,
                invalidate: true,
            });

            if (uploadResult) {
                await fs.promises.unlink(file.path);
            }
        }
        if (!nick || !text) return res.status(400).send({ msg: 'Error' });
        const date = new Date();
        notification.date = date;
        let array = [];
        await tweets.insertOne({
            nick: nick,
            text: text,
            date: date,
            likes: 0,
            retweets: 0,
            bookmarks: 0,
            reposts: 0,
            repostBy: array,
            reply: reply,
            parentId: parentId,
            imageId: file
                ? `https://res.cloudinary.com/df4tupotg/image/upload/${imageId}`
                : '',
            views: 0,
        });

        await users.updateOne(
            { nick: nick },
            { $set: { tweets: user.tweets + 1 } }
        );
        const newTweet = await tweets.findOne({ nick: nick, date: date });
        notification.content = newTweet;
        if (reply === 1) {
            await notifications.insertOne({
                nick: notification.nick,
                type: notification.type,
                date: notification.date,
                user: notification.user,
                content: notification.content,
            });
        }
        return res.status(200).send({ msg: 'Success', newTweet });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export const getTweets = async (req, res) => {
    const response = await tweets.find({}).sort({ _id: -1 }).toArray();
    const result = [];
    response.forEach((item) => {
        result.push(item);
        item.repostBy?.forEach((repost) => {
            result.push({ ...item, repost: [repost] });
        });
    });
    result.reverse().sort((a, b) => {
        const aRepost = a.repostBy;
        const bRepost = b.repostBy;
        const aDate = aRepost?.date ? aRepost.date : a.date;
        const bDate = bRepost?.date ? bRepost.date : b.date;
        return new Date(bDate) - new Date(aDate);
    });
    await tweets.updateMany({}, { $inc: { views: 1 } });
    return res.status(200).send({ result });
};

export const getSingleTweet = async (req, res) => {
    const { tweetId } = req.body;
    console.log(tweetId);
    if (!tweetId) return res.status(404).send();
    const _id = new ObjectId(tweetId);
    const result = await tweets.findOne({ _id: _id });
    return res.status(200).send({ result });
};

export const getUserTweets = async (req, res) => {
    const { nick } = req.body;
    const response = await tweets
        .find({
            $or: [{ nick: nick }, { repostBy: { $in: [nick] } }],
            reply: 0,
        })
        .sort({ _id: -1 })
        .toArray();

    const result = [];
    response.forEach((item) => {
        result.push(item);
        item.repostBy?.forEach((repost) => {
            if (repost.nick === nick) {
                result.push({ ...item, repost: [repost] });
            }
        });
    });
    result.reverse().sort((a, b) => {
        const aRepost = a.repostBy.find((repost) => repost.nick === nick);
        const bRepost = b.repostBy.find((repost) => repost.nick === nick);
        const aDate = aRepost ? aRepost.date : a.date;
        const bDate = bRepost ? bRepost.date : b.date;
        return new Date(bDate) - new Date(aDate);
    });
    return res.status(200).send({ result });
};

export const getUserReplies = async (req, res) => {
    const { nick } = req.body;
    const result = await tweets
        .find({ nick: nick, reply: 1 })
        .sort({ _id: -1 })
        .toArray();
    console.log(result);
    return res.status(200).send({ result });
};

export const getUserLikes = async (req, res) => {
    const { nick } = req.body;
    const like = await likes.find({ userId: nick }).toArray();
    const likesTab = like.map((el) => {
        return new ObjectId(el.tweetId);
    });
    console.log(likesTab);
    let result = [];
    for (let i = likesTab.length - 1; i >= 0; i--) {
        console.log(i);

        const record = await tweets.findOne({ _id: likesTab[i] });
        console.log(record);
        result.push(record);
    }

    return res.status(200).send({ result });
};
export const getUserBookmarks = async (req, res) => {
    const { nick } = req.body;
    const bookmarkList = await bookmarks.find({ userId: nick }).toArray();
    console.log(nick);
    const bookmarkTab = bookmarkList.map((el) => {
        return new ObjectId(el.tweetId);
    });
    let result = [];
    for (let i = bookmarkTab.length - 1; i >= 0; i--) {
        const record = await tweets.findOne({ _id: bookmarkTab[i] });
        result.push(record);
    }

    return res.status(200).send({ result });
};
export const tweetLike = async (req, res) => {
    const { tweetId, nick, mode } = req.body;
    console.log(tweetId);
    if (!tweetId || !nick) return res.status(400).send({ msg: 'Error' });
    const id = new ObjectId(tweetId);
    if (!mode) {
        const date = new Date();
        await likes.insertOne({
            tweetId: tweetId,
            userId: nick,
            date: date,
        });
    } else {
        await likes.deleteOne({ tweetId: tweetId, userId: nick });
    }

    const tweet = await tweets.findOne({ _id: id });
    console.log(tweet.likes);
    const like = tweet.likes + (mode ? -1 : 1);
    console.log(like);
    await tweets.updateOne(
        { _id: id },
        {
            $set: { likes: like },
        }
    );
    const date = new Date();
    if (nick !== tweet.nick) {
        const user = await Users.findOne({ nick: nick });
        console.log(user);
        await notifications.insertOne({
            nick: tweet.nick,
            type: 'like',
            date: date,
            user: user,
            content: tweet,
        });
    }
    return res.status(200).send({ msg: 'Success' });
};

export const handleBookmark = async (req, res) => {
    const { tweetId, nick, mode } = req.body;
    console.log(tweetId);
    if (!tweetId || !nick) return res.status(400).send({ msg: 'Error' });
    const id = new ObjectId(tweetId);
    if (!mode) {
        const date = new Date();
        await bookmarks.insertOne({
            tweetId: tweetId,
            userId: nick,
            date: date,
        });
    } else {
        await bookmarks.deleteOne({ tweetId: tweetId, userId: nick });
    }
    const tweet = await tweets.findOne({ _id: id });
    const bookmark = tweet.bookmarks + (mode ? -1 : 1);
    await tweets.updateOne(
        { _id: id },
        {
            $set: { bookmarks: bookmark },
        }
    );
    return res.status(200).send({ msg: 'Success' });
};

export const getLikes = async (req, res) => {
    const { nick } = req.body;
    console.log(nick);
    const likedTweets = await likes.find({ userId: nick }).toArray();
    const result = likedTweets.map((el) => el.tweetId);
    return res.status(200).send({ result });
};

export const getBookmarks = async (req, res) => {
    const { nick } = req.body;
    const bookmarkTweets = await bookmarks.find({ userId: nick }).toArray();
    const result = bookmarkTweets.map((el) => el.tweetId);
    return res.status(200).send({ result });
};

export const getReplies = async (req, res) => {
    const { tweetId } = req.body;

    const result = await tweets
        .find({ parentId: tweetId })
        .sort({ _id: -1 })
        .toArray();
    return res.status(200).send({ result });
};

export const getTweetsByKey = async (req, res) => {
    const { key } = req.body;

    const result = await tweets
        .find({ text: { $regex: key, $options: 'i' } })
        .toArray();

    return res.status(200).send({ result });
};
export const repostTweet = async (req, res) => {
    const { tweetId, repostBy, isReposted } = req.body;
    const id = new ObjectId(tweetId);
    const tweet = await tweets.findOne({ _id: id });
    let reposters = tweet.repostBy;
    const date = new Date();
    if (!isReposted) {
        reposters.push({ nick: repostBy, date: date });
    } else {
        reposters = reposters.filter((item) => item.nick !== repostBy);
    }
    await tweets.updateOne(
        { _id: id },
        {
            $set: {
                repostBy: reposters,
                reposts: tweet.reposts + (isReposted ? -1 : 1),
            },
        }
    );
    const user = await Users.findOne({ nick: repostBy });
    if (!isReposted) {
        await notifications.insertOne({
            nick: tweet.nick,
            type: 'repost',
            date: date,
            user: user,
            content: tweet,
        });
    } else {
        console.log(tweet);
        console.log(tweet.nick);
        console.log(user);
        const id = new ObjectId(tweet._id);
        await notifications.deleteOne({
            nick: tweet.nick,
            type: 'repost',
            'content._id': id,
        });
    }
    return res.status(200).send();
};
