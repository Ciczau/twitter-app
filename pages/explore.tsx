'use client';
import { useState } from 'react';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';
import Settings from 'components/Settings';
import MessageSection from 'containers/MessageSection';
import { useRouter } from 'next/router';
import ExploreSection from 'containers/ExploreSection';

const Home = () => {
    const [user, setUser] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
    return (
        <BodyContent auth={false} nickName={getUser}>
            <ExploreSection user={user} />
        </BodyContent>
    );
};

export default Home;
