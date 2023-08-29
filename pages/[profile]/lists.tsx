'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import ListsSection from 'containers/ListsSection';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };

    const router = useRouter();
    console.log(router.pathname);
    return (
        <BodyContent child={null} auth={false} nickName={getUser}>
            <ListsSection user={user} />
        </BodyContent>
    );
};
export default Home;
