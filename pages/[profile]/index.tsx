'use client';
import { useState, useEffect } from 'react';
import BodyContent, { User } from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';
import { TweetType } from 'components/Tweet';
import axios from 'axios';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<User>({
        nick: '',
        name: '',
        bio: '',
        avatar: '',
    });
    const router = useRouter();
    const { profile } = router.query;
    const getUser = (data) => {
        setUser(data);
        console.log(data);
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
                        avatar: res.data.avatar,
                    };
                    setUserProfile(userData);
                }
            }
            console.log(res);
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
                    user={userProfile}
                    profile={router.query.profile}
                    type="tweets"
                    child={null}
                />
            }
            auth={false}
            nickName={getUser}
        />
    );
};
export default Home;
