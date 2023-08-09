'use client';
import { useState, useEffect } from 'react';
import BodyContent from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TweetType } from 'components/Tweet';

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
                    type="likes"
                    child={null}
                />
            }
            auth={false}
            mail={getMail}
        />
    );
};
export default Home;
