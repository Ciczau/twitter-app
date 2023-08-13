import { ObjectId } from 'mongodb';
import { db } from '../database/mongo.js';
const tweets = db.collection('tweets');
const likes = db.collection('likes');
export const postTweet = async (req, res) => {
    const { nick, text, parentId } = req.body;
    let reply = 0;
    if (parentId) {
        reply = 1;
    }
    console.log(reply);
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
        views: 0,
    });
    const newTweet = await tweets.findOne({ nick: nick, date: date });
    return res.status(200).send({ msg: 'Success', newTweet });
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
