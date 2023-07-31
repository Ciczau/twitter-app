import { db } from '../database/Mongo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from './Token.js';

const Users = db.collection('users');

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
        const accessToken = generateAccessToken(user.email);
        return res.status(200).send({ accessToken });
    }
};

export const Register = async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    if (!email || !password) return res.status(400).send({ msg: 'Error' });
    if (password !== repeatPassword)
        return res.status(403).send({ msg: 'Passwords did not match' });
    const searchForUser = await Users.findOne({ email: email });
    if (searchForUser)
        return res.status(409).send({ msg: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await Users.insertOne({
        email: email,
        password: encryptedPassword,
        refreshToken: '',
    });
    return res.status(200).send({ msg: 'Success' });
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ msg: 'Error' });
    const User = await Users.findOne({ email: email });
    if (!User) return res.status(404).send({ msg: 'User not exists' });
    const checkPassword = await bcrypt.compare(password, User.password);
    if (!checkPassword) return res.status(401).send({ msg: 'Wrong password' });
    const refreshToken = generateRefreshToken(email);
    await Users.updateOne(
        { email: email },
        {
            $set: { refreshToken: refreshToken },
        }
    );
    return res.status(200).send({ msg: 'Success', refreshToken });
};
