'use client';
import { useState } from 'react';

import BodyContent, { User } from 'components/BodyContent';
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
