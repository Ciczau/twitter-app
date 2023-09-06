'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent, { User } from 'components/BodyContent';
import SearchSection from 'containers/CommunitiesSection/SearchSection';

const Home: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Communities">
            <SearchSection />
        </BodyContent>
    );
};
export default Home;
