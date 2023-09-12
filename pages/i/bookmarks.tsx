'use client';
import type { NextPage } from 'next';

import BodyContent from 'components/BodyContent';
import BookmarkSection from 'containers/BookmarkSection';

const Bookmarks: NextPage = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Bookmarks">
            <BookmarkSection />
        </BodyContent>
    );
};
export default Bookmarks;
