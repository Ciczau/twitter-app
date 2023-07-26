'use client';
import BodyContent from 'components/BodyContent';
import HomeSection from 'containers/HomeSection';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return <BodyContent child={<HomeSection />} />;
};
export default Home;
