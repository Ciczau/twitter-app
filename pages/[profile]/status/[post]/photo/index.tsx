import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { GlobalStyle } from 'components/BodyContent/index.styles';

const Post = () => {
    const router = useRouter();
    const { post, profile } = router.query;

    useEffect(() => {
        if (post && profile) {
            router.push(`/${profile}/status/${post}`);
        }
    }, [post, profile]);
    return <GlobalStyle />;
};

export default Post;
