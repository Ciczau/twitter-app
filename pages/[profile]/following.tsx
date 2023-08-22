'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import FollowSection from 'containers/ProfileSection/FollowSection';
import instance from 'api/instance';

const Home = () => {
    const router = useRouter();
    const { profile } = router.query;

    const [userProfile, setUserProfile] = useState<User>();

    const getUserByProfile = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: router.query.profile },
            });
            if (res.status === 200) {
                const nick = profile;
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
        getUserByProfile();
    }, [profile]);
    return (
        <BodyContent child={null} auth={false} nickName={() => console.log()}>
            <FollowSection user={userProfile} />
        </BodyContent>
    );
};
export default Home;
