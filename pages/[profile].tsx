'use client';
import { useState } from 'react';
import BodyContent from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const [mail, setMail] = useState<string>('');

    const router = useRouter();
    const { profile } = router.query;

    const getMail = (data) => {
        setMail(data);
    };
    return (
        <BodyContent
            child={<ProfileSection email={mail} profile={profile} />}
            auth={false}
            mail={getMail}
        />
    );
};
export default Home;
