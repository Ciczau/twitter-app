import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingPage from 'components/LoadingPage';
import { GlobalStyle } from 'components/BodyContent/index.styles';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/home');
    }, []);

    return (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default Home;
