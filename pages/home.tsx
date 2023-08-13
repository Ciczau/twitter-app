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
        <BodyContent
            child={<HomeSection user={user} />}
            auth={false}
            nickName={getUser}
        />
    );
};
export default Home;
