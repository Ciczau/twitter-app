'use client';
import { useState } from 'react';
import BodyContent, { User } from 'components/BodyContent';
import HomeSection from 'containers/HomeSection';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };
    return (
        <BodyContent child={null} auth={false} nickName={getUser}>
            <HomeSection user={user} />
        </BodyContent>
    );
};
export default Home;
