import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/home'); // Przekierowanie na stronę /home
    }, []);

    return null;
};

export default Home;
