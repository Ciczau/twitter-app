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
                setUserProfile(res.data.user);
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
            >
                {typeof post === 'string' &&
                    typeof profile === 'string' &&
                    user && (
                        <Tweets
                            nick={user?.nick}
                            profile={userProfile?.nick}
                            type="post-replies"
                            avatar={userProfile?.avatar}
                            tweet={tweet}
                            photoMode={false}
                            user={user}
                            postQuery={post}
                            profileQuery={profile}
                        />
                    )}
            </PostSection>
        </BodyContent>
    );
};

export default Home;
