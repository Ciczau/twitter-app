import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingPage from 'components/LoadingPage';
import { GlobalStyle } from 'components/BodyContent';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/home'); // Przekierowanie na stronę /home
    }, []);

    return (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default Home;
