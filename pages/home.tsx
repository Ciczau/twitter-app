'use client';
import { useState } from 'react';
import BodyContent from 'components/BodyContent';
import HomeSection from 'containers/HomeSection';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    const [mail, setMail] = useState<string>('');
    const getMail = (data) => {
        setMail(data);
    };
    return (
        <BodyContent
            child={<HomeSection email={mail} />}
            auth={false}
            mail={getMail}
        />
    );
};
export default Home;
