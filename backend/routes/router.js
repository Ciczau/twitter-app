import express from 'express';
import multer from 'multer';
import {
    EditProfile,
    GetUser,
    GetUsers,
    Login,
    Logout,
    Register,
    refreshToken,
} from '../controllers/users.js';
import {
    getLikes,
    getSingleTweet,
    getTweets,
    getUserLikes,
    getUserReplies,
    getUserTweets,
    postTweet,
    tweetLike,
} from '../controllers/tweets.js';
import {
    CheckIfFollowing,
    FollowUser,
    GetFollowers,
    GetFollowing,
    unFollow,
} from '../controllers/follows.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export const router = express();
router.post('/user/register', Register);
router.post('/user/login', Login);
router.post('/user/logout', Logout);
router.post('/user/edit', upload.single('file'), EditProfile);
router.post('/user', GetUser);
router.post('/users', GetUsers);
router.post('/token', refreshToken);

router.post('/tweet/create', upload.single('file'), postTweet);
router.post('/tweet/like', tweetLike);
router.post('/tweet/likes', getLikes);

router.get('/tweet/get', getTweets);
router.post('/tweet/getone', getSingleTweet);

router.post('/user/tweets', getUserTweets);
router.post('/user/replies', getUserReplies);
router.post('/user/likes', getUserLikes);

router.post('/follow/add', FollowUser);
router.post('/follow/followers', GetFollowers);
router.post('/follow/following', GetFollowing);
router.post('/follow/delete', unFollow);
router.post('/follow/check', CheckIfFollowing);
