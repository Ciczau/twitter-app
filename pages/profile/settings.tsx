'use client';
import { useState, useEffect } from 'react';
import BodyContent from 'components/BodyContent';

import type { NextPage } from 'next';
import ProfileSection from 'containers/ProfileSection';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TweetType } from 'components/Tweet';
import Settings from 'components/Settings';

const Home: NextPage = () => {
    const [mail, setMail] = useState<string>('');
    const getMail = (data) => {
        setMail(data);
    };

    return (
        <BodyContent
            child={
                <ProfileSection
                    email={mail}
                    profile={mail}
                    type="tweets"
                    child={<Settings email={mail} />}
                />
            }
            auth={false}
            mail={getMail}
        />
    );
};
export default Home;
