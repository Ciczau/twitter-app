import { Mukta } from 'next/font/google';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';

import instance from 'api/instance';
import Head from 'next/head';
import { User } from 'types/user';
import LoadingPage from 'components/LoadingPage';
import Header from 'components/Header';

import * as S from './index.styles';

export const font = Mukta({
    weight: '400',
    subsets: ['latin'],
});

export const UserContext = createContext<User>({} as User);

export default function BodyContent({
    auth,
    getUser = (data: User) => {},
    children,
    showHeader = true,
    activeHeaderItem = '',
}) {
    const [isLogged, setLogged] = useState<boolean>(false);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [cookie, setCookie, deleteCookie] = useCookies(['refreshToken']);
    const [user, setUser] = useState<User>();
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
                getUser(decoded);
                setTimeout(() => {
                    setLoaded(true);
                }, 500);
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
            <S.GlobalStyle />
            <Head>
                <title>{activeHeaderItem} / Twitter</title>
                <meta
                    name="description"
                    content="From breaking news and entertainment to sports and politics, get the full story with all the live commentary."
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            {isLogged ? (
                <>
                    {!isLoaded && <LoadingPage />}
                    {!auth && user && (
                        <UserContext.Provider value={user}>
                            <S.Wrapper>
                                {showHeader && (
                                    <Header
                                        activeHeaderItem={activeHeaderItem}
                                    />
                                )}
                                <S.MainWrapper id="main">
                                    {children}
                                </S.MainWrapper>
                            </S.Wrapper>
                        </UserContext.Provider>
                    )}
                </>
            ) : (
                <>{auth && <>{children}</>}</>
            )}
        </div>
    );
}
