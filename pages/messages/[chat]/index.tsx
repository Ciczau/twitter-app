'use client';
import { useEffect, useState } from 'react';

import ProfileSection from 'containers/ProfileSection';
import BodyContent, { User } from 'components/BodyContent';
import Settings from 'components/Settings';
import MessageSection from 'containers/MessageSection';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
`;

const Home = () => {
    const [user, setUser] = useState<User>();
    const [width, setWidth] = useState<number>();
    const router = useRouter();
    const { chat } = router.query;
    const getUser = (data: User) => {
        setUser(data);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    return (
        <BodyContent auth={false} nickName={getUser} showHeader={width && width < 767 ? false : true}>
            <Wrapper>
                {typeof chat === 'string' && width && width > 1100 && (
                    <MessageSection user={user} type="chats" chatQuery={chat} />
                )}
                {typeof chat === 'string' && (
                    <MessageSection
                        user={user}
                        type="openedChat"
                        chatQuery={chat}
                    />
                )}
            </Wrapper>
        </BodyContent>
    );
};

export default Home;
