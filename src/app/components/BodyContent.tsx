import styled, { createGlobalStyle } from 'styled-components';
import { Mukta } from 'next/font/google';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Header from './Header';
import instance from 'api/instance';

export const font = Mukta({
    weight: '400',
    subsets: ['latin'],
});

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;

    justify-content: center;
    background-color: black;
`;

const MainWrapper = styled.section`
    height: auto;
    position: relative;
    z-index: 99999;
    max-width: 85vw;
    overflow-y: scroll;
    border-left: 1px solid #c7c7c745;
    border-right: 1px solid #c7c7c745;
`;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        &::-webkit-scrollbar{
            width: 0;
        }
    }
`;
export interface User {
    nick: string;
    bio: string;
    name: string;
    avatar: string;
    tweets: number;
    followers: number;
    following: number;
}

export default function BodyContent({
    auth,
    nickName = (data: User) => {},
    children,
}) {
    const [isLogged, setLogged] = useState<boolean>(false);
    const [cookie, setCookie, deleteCookie] = useCookies(['refreshToken']);
    const [user, setUser] = useState<User>({
        nick: '',
        name: '',
        bio: '',
        avatar: '',
        tweets: 0,
        followers: 0,
        following: 0,
    });
    const router = useRouter();

    const refreshToken = async () => {
        const token = cookie.refreshToken;
        try {
            const res = await instance({
                url: '/token',
                method: 'POST',
                data: { refreshToken: token },
            });
            if (res.status === 200) {
                let decoded: User = jwtDecode(res.data.accessToken);
                setUser(decoded);
                nickName(decoded);
            }
        } catch (err) {
            deleteCookie('refreshToken');
        }
    };

    useEffect(() => {
        const path = window.location.pathname;
        if (cookie.refreshToken) {
            refreshToken();
            if (path.substring(0, 2) === '/x') {
                router.push('/home');
            }
            setLogged(true);
        } else {
            if (path.substring(0, 2) !== '/x') {
                router.push('/x');
            }
        }
    }, []);
    return (
        <div className={font.className}>
            <GlobalStyle />

            {isLogged ? (
                <>
                    {!auth && (
                        <Wrapper>
                            <Header user={user} />
                            <MainWrapper>{children}</MainWrapper>
                        </Wrapper>
                    )}
                </>
            ) : (
                <>{auth && <>{children}</>}</>
            )}
        </div>
    );
}
