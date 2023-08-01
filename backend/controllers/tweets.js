import { ObjectId } from 'mongodb';
import { db } from '../database/Mongo.js';
const tweets = db.collection('tweets');
const likes = db.collection('likes');
export const postTweet = async (req, res) => {
    const { email, text } = req.body;
    if (!email || !text) return res.status(400).send({ msg: 'Error' });
    const date = new Date();
    await tweets.insertOne({
        email: email,
        text: text,
        date: date,
        likes: 0,
        retweets: 0,
        views: 0,
    });
    return res.status(200).send({ msg: 'Success' });
};

export const getTweets = async (req, res) => {
    const result = await tweets.find({}).sort({ _id: -1 }).toArray();
    return res.status(200).send({ result });
};

export const tweetLike = async (req, res) => {
    const { tweetId, email } = req.body;
    console.log(tweetId);
    if (!tweetId || !email) return res.status(400).send({ msg: 'Error' });
    const date = new Date();
    await likes.insertOne({
        tweetId: tweetId,
        userId: email,
        date: date,
    });
    const id = new ObjectId(tweetId);
    const tweet = await tweets.findOne({ _id: id });
    console.log(tweet);
    const like = tweet.likes + 1;
    console.log(like);
    await tweets.updateOne(
        { _id: id },
        {
            $set: { likes: like },
        }
    );
    return res.status(200).send({ msg: 'Success' });
};
