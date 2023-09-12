'use client';
import type { NextPage } from 'next';

import BodyContent from 'components/BodyContent';
import HomeSection from 'containers/HomeSection';

const Home: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Home">
            <HomeSection />
        </BodyContent>
    );
};
export default Home;
