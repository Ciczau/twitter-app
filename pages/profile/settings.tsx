'use client';
import { useState } from 'react';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';
import Settings from 'components/Settings';

const Home = ({ type = 'tweets' }) => {
    const [user, setUser] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
    return (
        <BodyContent auth={false} nickName={getUser} activeHeaderItem="Profile">
            <ProfileSection user={user} profile={user} type={type}>
                <Settings
                    nick={user?.nick}
                    name={user?.name}
                    avatar={user?.avatar}
                    bio={user?.bio}
                />
            </ProfileSection>
        </BodyContent>
    );
};

export default Home;
