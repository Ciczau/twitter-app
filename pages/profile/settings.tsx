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
        <BodyContent child={null} auth={false} nickName={getUser}>
            <ProfileSection
                user={user}
                profile={user}
                type={type}
                child={
                    <Settings
                        nick={user?.nick}
                        name={user?.name}
                        avatar={user?.avatarId}
                        bio={user?.bio}
                    />
                }
            />
        </BodyContent>
    );
};
export default Home;
