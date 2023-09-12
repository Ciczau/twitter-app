'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import BodyContent from 'components/BodyContent';
import MessageSection from 'containers/MessageSection';

const Wrapper = styled.div`
    display: flex;
`;

const Chat = () => {
    const [width, setWidth] = useState<number>();
    const [chatQuery, setChatQuery] = useState<string>('');

    const router = useRouter();
    const { chat } = router.query;

    useEffect(() => {
        if (typeof chat === 'string') {
            setChatQuery(chat);
        }
    }, [chat]);

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    return (
        <BodyContent
            auth={false}
            showHeader={width && width < 767 ? false : true}
            activeHeaderItem="Messages"
        >
            <Wrapper>
                {width && width > 1100 && (
                    <MessageSection type="chats" chatQuery={chatQuery} />
                )}
                <MessageSection type="openedChat" chatQuery={chatQuery} />
            </Wrapper>
        </BodyContent>
    );
};

export default Chat;
