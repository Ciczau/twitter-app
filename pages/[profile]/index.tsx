'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';

const Home = ({ type = 'tweets' }) => {
    const router = useRouter();
    const { profile } = router.query;

    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
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
        <BodyContent
            child={
                <ProfileSection
                    user={user}
                    profile={userProfile}
                    type={type}
                    child={null}
                />
            }
            auth={false}
            nickName={getUser}
        />
    );
};
export default Home;
