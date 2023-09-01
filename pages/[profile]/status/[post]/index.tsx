import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import instance from 'api/instance';
import BodyContent, { User } from 'components/BodyContent';
import { TweetType } from 'components/Tweet';
import Tweets from 'components/Tweets';
import PostSection from 'containers/PostSection';

const Home = () => {
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<User>();
    const [tweet, setTweet] = useState<TweetType>();
    const getUser = (data) => {
        setUser(data);
    };
    const router = useRouter();
    const { post, profile } = router.query;
    const getPost = async () => {
        try {
            const res = await instance({
                url: '/tweet/getone',
                method: 'POST',
                data: { tweetId: post },
            });
            setTweet(res.data.result);
        } catch (err) {
            console.error(err);
        }
    };
    const getUserByProfile = async () => {
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
    }, [tweet]);
    return (
        <BodyContent auth={false} nickName={getUser}>
            <PostSection
                user={user}
                type="normal"
                photo={tweet?.imageId}
                handleModal={null}
                child={
                    typeof post === 'string' &&
                    typeof profile === 'string' && (
                        <Tweets
                            nick={user?.nick}
                            profile={userProfile?.nick}
                            type="post-replies"
                            avatar={userProfile?.avatarId}
                            tweet={tweet}
                            photoMode={false}
                            user={user}
                            postQuery={post}
                            profileQuery={profile}
                        />
                    )
                }
            />
        </BodyContent>
    );
};

export default Home;
