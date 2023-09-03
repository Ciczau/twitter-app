'use client';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return null;
};

export default Home;

export async function getStaticProps() {
    return {
        redirect: {
            permanent: false,
            destination: '/home',
        },
    };
}
