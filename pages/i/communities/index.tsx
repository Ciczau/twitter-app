'use client';
import type { NextPage } from 'next';

import BodyContent from 'components/BodyContent';
import SearchSection from 'containers/CommunitiesSection/SearchSection';

const Home: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Communities">
            <SearchSection />
        </BodyContent>
    );
};
export default Home;
