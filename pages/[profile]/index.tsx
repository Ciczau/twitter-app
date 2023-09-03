'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';
import instance from 'api/instance';

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
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: profile },
            });
            if (res.status === 200) {
                setUserProfile(res.data.user);
            }
        } catch (err) {}
    };
    useEffect(() => {
        getUserByProfile();
    }, [profile]);

    return (
        <>
            {typeof profile === 'string' && (
                <BodyContent auth={false} nickName={getUser}>
                    <ProfileSection
                        user={user}
                        profile={userProfile}
                        type={type}
                        profileQuery={profile}
                        children={null}
                    />
                </BodyContent>
            )}
        </>
    );
};
export default Home;
