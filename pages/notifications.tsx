'use client';
import { useState } from 'react';

import BodyContent, { User } from 'components/BodyContent';
import NotificationSection from 'containers/NotificationSection';

const Home = () => {
    const [user, setUser] = useState<User>();

    const getUser = (data: User) => {
        setUser(data);
    };
    return (
        <BodyContent
            auth={false}
            nickName={getUser}
            activeHeaderItem="Notifications"
        >
            <NotificationSection user={user} />
        </BodyContent>
    );
};

export default Home;
