'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent from 'components/BodyContent';
import CommunitySection from 'containers/CommunitiesSection/CommunitySection';

const Home: NextPage = () => {
    const router = useRouter();
    const { community } = router.query;
    return (
        <BodyContent auth={false} activeHeaderItem="Communities">
            <CommunitySection communityQuery={community} />
        </BodyContent>
    );
};
export default Home;
