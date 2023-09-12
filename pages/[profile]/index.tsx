'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ProfileSection from 'containers/ProfileSection';
import BodyContent from 'components/BodyContent';
import { User } from 'types/user';
import { GetUserRequest } from 'api/users';

const Profile = ({ type = 'tweets' }) => {
    const [profileQuery, setProfileQuery] = useState<string>('');
    const [userProfile, setUserProfile] = useState<User>();

    const router = useRouter();
    const { profile } = router.query;

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
            <ProfileSection
                profile={userProfile}
                type={type}
                profileQuery={profileQuery}
            >
                {null}
            </ProfileSection>
        </BodyContent>
    );
};
export default Profile;
