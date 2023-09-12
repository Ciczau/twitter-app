'use client';
import type { NextPage } from 'next';

import BodyContent from 'components/BodyContent';
import ListsSection from 'containers/ListsSection';

const Lists: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Profile">
            <ListsSection />
        </BodyContent>
    );
};
export default Lists;
