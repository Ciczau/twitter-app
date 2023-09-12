import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BodyContent from 'components/BodyContent';
import Tweets from 'components/Tweets';
import PostSection from 'containers/PostSection';
import { User } from 'types/user';
import { TweetType } from 'types/tweets';
import { GetTweetRequest } from 'api/tweets';
import { GetUserRequest } from 'api/users';

const Post = () => {
    const [userProfile, setUserProfile] = useState<User>();
    const [tweet, setTweet] = useState<TweetType>({} as TweetType);
    const [postQuery, setPostQuery] = useState<string>('');
    const [profileQuery, setProfileQuery] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const { post, profile } = router.query;
        if (typeof post === 'string') {
            setPostQuery(post);
        }
        if (typeof profile === 'string') {
            setProfileQuery(profile);
        }
    }, [router.query]);

    const getPost = async () => {
        try {
            const post = await GetTweetRequest(postQuery);
            setTweet(post);
        } catch (err) {
            console.error(err);
        }
    };
    const getUserByProfile = async () => {
        try {
            const user = await GetUserRequest(tweet.nick);
            setUserProfile(user);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getPost();
    }, [postQuery]);
    useEffect(() => {
        getUserByProfile();
    }, [tweet]);
    return (
        <BodyContent auth={false}>
            <PostSection
                type="normal"
                photo={tweet?.imageId}
                handleModal={null}
            >
                <Tweets
                    profile={userProfile?.nick}
                    type="post-replies"
                    avatar={userProfile?.avatar}
                    tweet={tweet}
                    photoMode={false}
                    postQuery={postQuery}
                    profileQuery={profileQuery}
                />
            </PostSection>
        </BodyContent>
    );
};

export default Post;
