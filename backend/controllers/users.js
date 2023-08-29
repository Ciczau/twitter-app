import { db } from '../database/mongo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from './token.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { notifications } from './notifications.js';
import { follows } from './follows.js';

cloudinary.config({
    cloud_name: 'df4tupotg',
    api_key: '626447796253867',
    api_secret: 'mPXy5pytK8szulO6NY69mlAtP8Y',
});

export const Users = db.collection('users');

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).send({ msg: 'Error' });
    const user = await Users.findOne({ refreshToken: refreshToken });
    if (!user)
        return res
            .status(409)
            .send({ msg: 'Cannot find user with this token' });
    const verifyToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
        return res.status(401).send({ msg: 'Token not verified' });
    } else {
        const avatarUrl = `https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`;
        const accessToken = generateAccessToken(
            user.nick,
            user.bio,
            user.name,
            avatarUrl,
            user.tweets,
            user.followers,
            user.following
        );

        return res.status(200).send({ accessToken });
    }
};

export const Register = async (req, res) => {
    const { email, nick, password, repeatPassword } = req.body;
    if (!email || !nick || !password || !repeatPassword)
        return res.status(400).send({ msg: 'Error' });
    if (password !== repeatPassword)
        return res.status(403).send({ msg: 'Passwords did not match' });
    const searchForUserByMail = await Users.findOne({ email: email });
    const searchForUserByNick = await Users.findOne({ nick: nick });
    if (searchForUserByMail || searchForUserByNick)
        return res.status(409).send({
            msg: 'User already exists',
            mail: searchForUserByMail,
            nick: searchForUserByNick,
        });
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const refreshToken = generateRefreshToken(nick);
    await Users.insertOne({
        email: email,
        nick: nick,
        name: nick,
        bio: '',
        avatarId: 'defaultAvatar',
        password: encryptedPassword,
        refreshToken: refreshToken,
        tweets: 0,
        following: 0,
        followers: 0,
    });
    return res.status(200).send({ msg: 'Success', refreshToken });
};

export const Login = async (req, res) => {
    const { nick, password } = req.body;
    if (!nick || !password) return res.status(400).send({ msg: 'Error' });
    const User = await Users.findOne({ nick: nick });
    if (!User) return res.status(404).send({ msg: 'User not exists' });
    const checkPassword = await bcrypt.compare(password, User.password);
    if (!checkPassword) return res.status(401).send({ msg: 'Wrong password' });
    const refreshToken = generateRefreshToken(nick);
    await Users.updateOne(
        { nick: nick },
        {
            $set: { refreshToken: refreshToken },
        }
    );
    const date = new Date();
    await notifications.insertOne({ nick: nick, type: 'login', date: date });
    return res.status(200).send({ msg: 'Success', refreshToken });
};

export const Logout = async (req, res) => {
    const { nick } = req.body;
    if (!nick) return res.status(400).send();
    await Users.updateOne({ nick: nick }, { $set: { refreshToken: '' } });
    return res.status(200).send();
};

export function generateRandomCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}

export const EditProfile = async (req, res) => {
    try {
        const { file } = req;
        const { name, bio, nick } = req.body;
        const fileName = generateRandomCode();
        const user = await Users.findOne({ nick: nick });
        await Users.updateOne(
            { nick: nick },
            { $set: { name: name, bio: bio } }
        );

        if (file) {
            if (user.avatar !== 'defaultAvatar') {
                await cloudinary.uploader.destroy(user.avatarId);
            }
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                public_id: fileName,
                invalidate: true,
            });
            await Users.updateOne(
                { nick: nick },
                { $set: { avatarId: fileName } }
            );
            if (uploadResult) {
                await fs.promises.unlink(file.path);
            }
        }

        return res.status(200).send();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export const GetUser = async (req, res) => {
    const { nick } = req.body;
    const user = await Users.findOne({ nick: nick });
    if (!user) return res.status(404).send();
    const avatar = `https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`;
    const { name, bio, followers, following, tweets } = user;
    return res
        .status(200)
        .send({ avatar, name, bio, followers, following, tweets });
};

export const GetUsers = async (req, res) => {
    const { list } = req.body;
    console.log(list);
    if (!list) return res.status(400).send();
    const users = [];
    for (let i = 0; i < list.length; i++) {
        const user = await Users.findOne({ nick: list[i] });
        users.push(user);
    }
    return res.status(200).send({ users });
};

export const GetAllUsers = async (req, res) => {
    const users = await Users.find({}).toArray();
    return res.status(200).send({ users });
};

export const GetUsersByKey = async (req, res) => {
    const { key } = req.body;
    console.log(key);
    const result = await Users.find({
        nick: { $regex: key, $options: 'i' },
    }).toArray();
    return res.status(200).send({ result });
};

export const GetEachOtherFollows = async (req, res) => {
    const { nick, key } = req.body;
    if (!nick) return res.status(404).send();
    let result = [];

    const users = await follows
        .find({
            $or: [{ followBy: nick }, { userToFollow: nick }],
        })
        .toArray();

    let userNickList = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            console.log(users[i].followBy);
            if (
                users[i].followBy === users[j].userToFollow &&
                users[i].followBy !== nick
            ) {
                userNickList.push(users[i].followBy);
            }
        }
    }

    for (let i = 0; i < userNickList.length; i++) {
        const user = await Users.findOne({ nick: userNickList[i] });
        result.push({ user: user, followEachOther: true });
    }
    let newResult = [];
    if (key !== '') {
        const usersByKey = await Users.find({
            nick: { $regex: key, $options: 'i' },
        }).toArray();
        console.log(usersByKey);
        for (let i = 0; i < usersByKey.length; i++) {
            const user = await Users.findOne({ nick: usersByKey[i].nick });
            console.log(result.filter((el) => el.user.nick === user.nick));
            if (!result.find((el) => el.user.nick === user.nick)) {
                newResult.push({ user: user, followEachOther: false });
            } else {
                newResult.push({ user: user, followEachOther: true });
            }
        }
        result = newResult;
    }
    return res.status(200).send({ result });
};
