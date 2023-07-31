import { db } from '../database/Mongo.js';
const tweets = db.collection('tweets');

export const postTweet = async (req, res) => {
    const { email, text } = req.body;
    if (!email || !text) return res.status(400).send({ msg: 'Error' });
    const date = new Date();
    await tweets.insertOne({
        email: email,
        text: text,
        date: date,
    });
    return res.status(200).send({ msg: 'Success' });
};

export const getTweets = async (req, res) => {
    const result = await tweets.find({}).toArray();
    return res.status(200).send({ result });
};
