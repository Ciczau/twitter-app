'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import CommunitySection from 'containers/CommunitiesSection/CommunitySection';

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const getUser = (data) => {
        setUser(data);
    };

    const router = useRouter();
    const { community } = router.query;
    console.log(router.pathname);
    return (
        <BodyContent
            auth={false}
            nickName={getUser}
            activeHeaderItem="Communities"
        >
            <CommunitySection communityQuery={community} user={user} />
        </BodyContent>
    );
};
export default Home;
