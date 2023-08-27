'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';
import instance from 'api/instance';

const Home = ({ type = 'tweets' }) => {
    const router = useRouter();
    const { profile, previous } = router.query;

    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
    const getUserByProfile = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: profile },
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
        <BodyContent child={null} auth={false} nickName={getUser}>
            {typeof profile === 'string' && (
                <ProfileSection
                    user={user}
                    profile={userProfile}
                    type={type}
                    child={null}
                    profileQuery={profile}
                />
            )}
        </BodyContent>
    );
};
export default Home;
