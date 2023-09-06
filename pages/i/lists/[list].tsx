'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import HomeSection from 'containers/HomeSection';
import BookmarkSection from 'containers/BookmarkSection';
import ListSection from 'containers/ListSection';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };

    const router = useRouter();
    const { list } = router.query;
    console.log(router.pathname);

    return (
        <BodyContent auth={false} nickName={getUser} activeHeaderItem="Lists">
            <ListSection user={user} listQuery={list} />
        </BodyContent>
    );
};
export default Home;
