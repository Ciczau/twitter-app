'use client';
import { useState } from 'react';

import ProfileSection from 'containers/ProfileSection';
import BodyContent from 'components/BodyContent';
import Settings from 'components/Settings';
import { User } from 'types/user';

const ProfileSettings = ({ type = 'tweets' }) => {
    const [user, setUser] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
    return (
        <BodyContent auth={false} getUser={getUser} activeHeaderItem="Profile">
            <ProfileSection profile={user} type={type}>
                <Settings />
            </ProfileSection>
        </BodyContent>
    );
};

export default ProfileSettings;
