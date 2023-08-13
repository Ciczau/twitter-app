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

    const router = useRouter();

    const getUser = (data) => {
        setUser(data);
    };

    return (
        <BodyContent
            child={
                <ProfileSection
                    user={user}
                    profile={router.query.profile}
                    type="replies"
                    child={null}
                />
            }
            auth={false}
            nickName={getUser}
        />
    );
};
export default Home;
