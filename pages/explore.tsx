'use client';

import BodyContent from 'components/BodyContent';
import ExploreSection from 'containers/ExploreSection';

const Explore = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Explore">
            <ExploreSection />
        </BodyContent>
    );
};

export default Explore;
