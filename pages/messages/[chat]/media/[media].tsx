import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { GlobalStyle } from 'components/BodyContent/index.styles';

const Media = () => {
    const router = useRouter();
    const { chat } = router.query;

    useEffect(() => {
        if (chat) {
            router.push(`/messages/${chat}`);
        }
    }, [chat]);
    return <GlobalStyle />;
};

export default Media;
