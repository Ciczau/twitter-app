import express from 'express';
import { Login, Register, refreshToken } from '../controllers/users.js';
import { getTweets, postTweet, tweetLike } from '../controllers/tweets.js';

export const router = express();
router.post('/user/register', Register);
router.post('/user/login', Login);
router.post('/token', refreshToken);
router.post('/tweet/create', postTweet);
router.post('/tweet/like', tweetLike);

router.get('/tweet/get', getTweets);
