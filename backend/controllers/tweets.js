import { ObjectId } from 'mongodb';
import { db } from '../database/mongo.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';
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
const tweets = db.collection('tweets');
const likes = db.collection('likes');
const users = db.collection('users');
export const postTweet = async (req, res) => {
    try {
        const { file } = req;
        const { nick, text, parentId } = req.body;
        let reply = 0;
        if (parentId) {
            reply = 1;
            const id = new ObjectId(parentId);
            const parentTweet = await tweets.findOne({ _id: id });
            await tweets.updateOne(
                { _id: id },
                { $set: { retweets: parentTweet.retweets + 1 } }
            );
        }
        const imageId = generateRandomCode();
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
        await tweets.insertOne({
            nick: nick,
            text: text,
            date: date,
            likes: 0,
            retweets: 0,
            reply: reply,
            parentId: parentId,
            imageId: file
                ? `https://res.cloudinary.com/df4tupotg/image/upload/${imageId}`
                : '',
            views: 0,
        });
        const user = await users.findOne({ nick: nick });
        await users.updateOne(
            { nick: nick },
            { $set: { tweets: user.tweets + 1 } }
        );
        const newTweet = await tweets.findOne({ nick: nick, date: date });
        return res.status(200).send({ msg: 'Success', newTweet });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export const getTweets = async (req, res) => {
    const result = await tweets.find({}).sort({ _id: -1 }).toArray();
    return res.status(200).send({ result });
};

export const getSingleTweet = async (req, res) => {
    const { tweetId } = req.body;
    const _id = new ObjectId(tweetId);
    const result = await tweets.findOne({ _id: _id });
    return res.status(200).send({ result });
};

export const getUserTweets = async (req, res) => {
    const { nick } = req.body;
    const result = await tweets
        .find({ nick: nick, reply: 0 })
        .sort({ _id: -1 })
        .toArray();
    console.log(result);
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
    return res.status(200).send({ msg: 'Success' });
};

export const getLikes = async (req, res) => {
    const { nick } = req.body;
    console.log(nick);
    const likedTweets = await likes.find({ userId: nick }).toArray();
    const result = likedTweets.map((el) => el.tweetId);
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
