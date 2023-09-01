import { ObjectId } from 'mongodb';
import { db } from '../database/mongo.js';
import { generateRandomCode } from './users.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { tweets } from './tweets.js';

cloudinary.config({
    cloud_name: 'df4tupotg',
    api_key: '626447796253867',
    api_secret: 'mPXy5pytK8szulO6NY69mlAtP8Y',
});

const communities = db.collection('communities');
export const createCommunity = async (req, res) => {
    const { file } = req;
    const { name, nick } = req.body;
    const imageId = generateRandomCode();
    if (file) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            public_id: imageId,
        });

        if (uploadResult) {
            await fs.promises.unlink(file.path);
        }
    }
    let members = [nick];
    await communities.insertOne({
        name: name,
        members: members,
        avatar: `https://res.cloudinary.com/df4tupotg/image/upload/${imageId}`,
    });
    return res.status(200).send();
};
export const getUserCommunities = async (req, res) => {
    const { nick } = req.body;
    const result = await communities
        .find({ members: { $in: [nick] } })
        .toArray();
    console.log(result);
    return res.status(200).send({ result });
};
export const joinCommunity = async (req, res) => {
    const { nick, community } = req.body;
    await communities.updateOne(
        { name: community },
        { $push: { members: nick } }
    );
    return res.status(200).send();
};
export const GetCommunitiesByKey = async (req, res) => {
    const { key } = req.body;
    console.log(key);
    if (!key) return res.status(200).send({ result: [] });
    const result = await communities
        .find({
            name: { $regex: key, $options: 'i' },
        })
        .sort({ _id: -1 })
        .toArray();
    return res.status(200).send({ result });
};
export const getCommunity = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(404).send();
    const communityId = new ObjectId(id);
    const result = await communities.findOne({ _id: communityId });
    return res.status(200).send({ result });
};
export const getCommunityTweets = async (req, res) => {
    const { communityId } = req.body;
    const result = await tweets.find({ audience: communityId }).toArray();
    console.log(result);
    return res.status(200).send({ result });
};
export const getUserCommunitiesTweets = async (req, res) => {
    const { nick } = req.body;
    if (!nick) return res.status(404).send();
    const communitiesList = await communities
        .find({
            members: { $in: [nick] },
        })
        .toArray();

    let result = [];
    for (let i = 0; i < communitiesList.length; i++) {
        const tweetList = await tweets
            .find({ audience: communitiesList[i]._id.toString() })
            .toArray();
        console.log(communitiesList[i]._id);
        for (let j = 0; j < tweetList.length; j++) {
            result.push(tweetList[j]);
        }
    }
    result.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return res.status(200).send({ result });
};
