'use client';
import type { NextPage } from 'next';

import BodyContent from 'components/BodyContent';
import CommunitiesSection from 'containers/CommunitiesSection';

const Communities: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Communities">
            <CommunitiesSection />
        </BodyContent>
    );
};
export default Communities;
