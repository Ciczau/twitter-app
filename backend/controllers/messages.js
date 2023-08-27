import { db } from '../database/mongo.js';
import { generateRandomCode } from './users.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'df4tupotg',
    api_key: '626447796253867',
    api_secret: 'mPXy5pytK8szulO6NY69mlAtP8Y',
});

const chats = db.collection('chats');
const users = db.collection('users');
export const newChat = async (req, res) => {
    const { firstUser, secondUser } = req.body;
    const id = generateRandomCode();
    const userArray = [firstUser, secondUser];
    await chats.insertOne({ id: id, userArray: userArray });
    db.createCollection(id);

    return res.status(200).send();
};

export const getUserChats = async (req, res) => {
    const { nick } = req.body;
    console.log(nick);
    const userChats = await chats
        .find({ userArray: { $in: [nick] } })
        .toArray();
    let tab = [];
    for (let i = 0; i < userChats.length; i++) {
        const user =
            userChats[i].userArray[0] === nick
                ? userChats[i].userArray[1]
                : userChats[i].userArray[0];
        const userData = await users.findOne({ nick: user });
        tab.push({ user: userData, id: userChats[i].id });
    }
    console.log(tab);
    return res.status(200).send({ tab });
};

export const sendMessage = async (req, res) => {
    try {
        const { file } = req;
        const { sender, receiver, message, id } = req.body;
        console.log(req.body);
        const chatCollection = db.collection(id);
        if (message) {
            await chatCollection.insertOne({
                sender: sender,
                receiver: receiver,
                message: message,
                image: '',
            });
        }
        const fileName = generateRandomCode();
        if (file) {
            await cloudinary.uploader.upload(file.path, {
                public_id: fileName,
            });
            await chatCollection.insertOne({
                sender: sender,
                receiver: receiver,
                message: '',
                image: `https://res.cloudinary.com/df4tupotg/image/upload/${fileName}`,
            });
        }
        const imageUrl = file
            ? `https://res.cloudinary.com/df4tupotg/image/upload/${fileName}`
            : undefined;
        return res.status(200).send({ imageUrl });
    } catch (err) {
        return res.status(404).send();
    }
};

export const getChat = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    if (!id) return res.status(404).send();
    const chatCollection = db.collection(id);
    const chat = await chatCollection.find({}).sort({ _id: -1 }).toArray();
    return res.status(200).send({ chat });
};
