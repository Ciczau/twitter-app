'use client';
import { useState, useEffect } from 'react';
import BodyContent, { User } from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TweetType } from 'components/Tweet';
import Settings from 'components/Settings';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };

    return (
        <BodyContent
            child={
                <ProfileSection
                    user={user}
                    profile={user?.nick}
                    type="tweets"
                    child={
                        <Settings
                            nick={user?.nick}
                            name={user?.name}
                            bio={user?.bio}
                            avatar={user?.avatar}
                        />
                    }
                />
            }
            auth={false}
            nickName={getUser}
        />
    );
};
export default Home;
