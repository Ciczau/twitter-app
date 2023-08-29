import { db } from '../database/mongo.js';
import { tweets } from './tweets.js';
import { generateRandomCode } from './users.js';

const lists = db.collection('lists');

export const createList = async (req, res) => {
    const { creator, name, desc } = req.body;
    if (!creator || !name || !desc) return res.status(404).send();
    const id = generateRandomCode();
    let members = [creator.nick];
    let followers = [];
    await lists.insertOne({
        id: id,
        creator: creator,
        name: name,
        desc: desc,
        members: members,
        followers: followers,
    });
    return res.status(200).send();
};
export const getUserList = async (req, res) => {
    const { nick } = req.body;
    if (!nick) return res.status(404).send();
    const result = await lists
        .find({
            $or: [{ members: { $in: [nick] } }, { followers: { $in: [nick] } }],
        })
        .sort({ _id: -1 })
        .toArray();
    console.log(result);
    return res.status(200).send({ result });
};

export const getList = async (req, res) => {
    const { id } = req.body;
    const result = await lists.findOne({ id: id });
    return res.status(200).send({ result });
};

export const getListTweets = async (req, res) => {
    const { listId } = req.body;
    if (!listId) return res.status(404).send();
    const list = await lists.findOne({ id: listId });
    let result = [];
    const userArray = list.members;
    for (let i = 0; i < userArray.length; i++) {
        const tweetList = await tweets.find({ nick: userArray[i] }).toArray();
        for (let j = 0; j < tweetList.length; j++) {
            result.push(tweetList[j]);
        }
    }

    result.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    console.log(result);
    return res.status(200).send({ result });
};
