'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import FollowSection from 'containers/ProfileSection/FollowSection';

const Home = () => {
    const router = useRouter();
    const { profile } = router.query;

    const [userProfile, setUserProfile] = useState<User>();

    const getUserByProfile = async () => {
        try {
            const res = await axios.post('http://localhost:5000/user', {
                nick: router.query.profile,
            });
            if (res.status === 200) {
                const nick = profile;
                if (typeof nick === 'string') {
                    const userData: User = {
                        nick: nick,
                        name: res.data.name,
                        bio: res.data.bio,
                        avatar: res.data.avatar,
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
        getUserByProfile();
    }, [profile]);
    return (
        <BodyContent
            child={<FollowSection user={userProfile} />}
            auth={false}
            nickName={() => console.log()}
        />
    );
};
export default Home;
