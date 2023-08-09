'use client';
import { useState, useEffect } from 'react';
import BodyContent from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';
import { TweetType } from 'components/Tweet';
import axios from 'axios';

const Home: NextPage = () => {
    const [mail, setMail] = useState<string>('');

    const router = useRouter();

    const getMail = (data) => {
        setMail(data);
    };

    return (
        <BodyContent
            child={
                <ProfileSection
                    email={mail}
                    profile={router.query.profile}
                    type="replies"
                    child={null}
                />
            }
            auth={false}
            mail={getMail}
        />
    );
};
export default Home;
