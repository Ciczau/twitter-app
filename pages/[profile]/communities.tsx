'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import CommunitiesSection from 'containers/CommunitiesSection';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };

    const router = useRouter();
    console.log(router.pathname);
    return (
        <BodyContent auth={false} nickName={getUser}>
            <CommunitiesSection user={user} />
        </BodyContent>
    );
};
export default Home;
