import express from 'express';
import { Login, Register, refreshToken } from '../controllers/users.js';
import {
    getLikes,
    getTweets,
    getUserLikes,
    getUserReplies,
    getUserTweets,
    postTweet,
    tweetLike,
} from '../controllers/tweets.js';

export const router = express();
router.post('/user/register', Register);
router.post('/user/login', Login);
router.post('/token', refreshToken);
router.post('/tweet/create', postTweet);
router.post('/tweet/like', tweetLike);
router.post('/tweet/likes', getLikes);

router.get('/tweet/get', getTweets);
router.post('/user/tweets', getUserTweets);
router.post('/user/replies', getUserReplies);
router.post('/user/likes', getUserLikes);
