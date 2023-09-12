'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import BodyContent from 'components/BodyContent';
import ListSection from 'containers/ListSection';

const List: NextPage = () => {
    const router = useRouter();
    const { list } = router.query;
    return (
        <BodyContent auth={false} activeHeaderItem="Lists">
            <ListSection listQuery={list} />
        </BodyContent>
    );
};
export default List;
