'use client';
import BodyContent from 'components/BodyContent';
import { GetStaticProps } from 'next';

export default function Page() {
    return (
        <BodyContent
            child={<div style={{ color: 'white' }}>CXhujsko</div>}
            auth={false}
        />
    );
}
