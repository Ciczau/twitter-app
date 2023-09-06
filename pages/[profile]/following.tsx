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
                setUserProfile(res.data.user);
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUserByProfile();
    }, [profile]);
    return (
        <BodyContent auth={false} activeHeaderItem="Profile">
            <FollowSection user={userProfile} />
        </BodyContent>
    );
};
export default Home;
