import instance from 'api/instance';
import BodyContent, { User } from 'components/BodyContent';
import { TweetType } from 'components/Tweet';
import Tweets from 'components/Tweets';
import PostSection from 'containers/PostSection';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Home = ({ type = 'normal' }) => {
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<User>();
    const [tweet, setTweet] = useState<TweetType>();
    const getUser = (data) => {
        setUser(data);
    };
    const router = useRouter();
    const { post } = router.query;
    const getPost = async () => {
        console.log(post);
        try {
            const res = await instance({
                url: '/tweet/getone',
                method: 'POST',
                data: { tweetId: post },
            });
            console.log(res);
            setTweet(res.data.result);
        } catch (err) {
            console.error(err);
        }
    };
    const getUserByProfile = async () => {
        console.log(tweet);
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: tweet?.nick },
            });
            if (res.status === 200) {
                const nick = tweet?.nick;
                if (typeof nick === 'string') {
                    const userData: User = {
                        nick: nick,
                        name: res.data.name,
                        bio: res.data.bio,
                        avatarId: res.data.avatar,
                        followers: res.data.followers,
                        following: res.data.following,
                        tweets: res.data.tweets,
                    };
                    setUserProfile(userData);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getPost();
    }, [post]);
    useEffect(() => {
        getUserByProfile();
        console.log(tweet);
    }, [tweet]);
    return (
        <BodyContent
            child={
                <PostSection
                    user={user}
                    type={type}
                    photo={tweet?.imageId}
                    child={
                        <Tweets
                            nick={user?.nick}
                            profile={userProfile?.nick}
                            type="post-replies"
                            avatar={userProfile?.avatarId}
                            postTweet={tweet}
                            photoMode={type === 'photo' ? true : false}
                        />
                    }
                />
            }
            auth={false}
            nickName={getUser}
        />
    );
};

export default Home;
