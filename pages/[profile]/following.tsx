'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import BodyContent from 'components/BodyContent';
import FollowSection from 'containers/ProfileSection/FollowSection';
import { User } from 'types/user';
import { GetUserRequest } from 'api/users';

const Following = () => {
    const router = useRouter();
    const { profile } = router.query;

    const [userProfile, setUserProfile] = useState<User>();
    const [profileQuery, setProfileQuery] = useState<string>('');

    useEffect(() => {
        if (typeof profile === 'string') {
            setProfileQuery(profile);
        }
    }, [profile]);

    const getUserByProfile = async () => {
        try {
            const user = await GetUserRequest(profileQuery);
            setUserProfile(user);
        } catch (err) {}
    };
    useEffect(() => {
        getUserByProfile();
    }, [profileQuery]);
    return (
        <BodyContent auth={false} activeHeaderItem="Profile">
            <FollowSection user={userProfile} />
        </BodyContent>
    );
};
export default Following;
