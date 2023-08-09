import { menuItems } from 'components/MenuItems';
import { useRouter } from 'next/router';
import { Tooltip } from '@nextui-org/react';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { font } from 'components/BodyContent';

const Header = ({ email }) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [cookie, setCookie, deleteCookie] = useCookies(['refreshToken']);
    const router = useRouter();

    const handleRedirect = (link: string) => {
        router.push(link);
    };

    useEffect(() => {
        const handleWidth = (e) => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    const handleLogout = () => {
        deleteCookie('refreshToken');
        router.push('/x');
    };
    return (
        <S.Wrapper>
            <S.Header>
                {menuItems.map((item, index) => {
                    const link =
                        item.name === 'Profile' ? `/${email}` : item.link;

                    return (
                        <S.HeaderElement
                            key={index}
                            onClick={() => handleRedirect(link)}
                        >
                            <div>{item.icon}</div>
                            {width > 767 && <div>{item.name}</div>}
                        </S.HeaderElement>
                    );
                })}
            </S.Header>
            <S.HeaderElement>
                <Tooltip
                    trigger="click"
                    content={
                        <div className={font.className} onClick={handleLogout}>
                            Logout
                        </div>
                    }
                    placement="top"
                    hideArrow={false}
                    color={'primary'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: width > 767 ? 'space-around' : 'center',
                        padding: '6px',

                        width: '100%',
                        zIndex: '9999999999',
                    }}
                >
                    <img
                        src="/p2.2.jpeg"
                        style={{
                            width: '45px',
                            objectFit: 'cover',
                            height: '45px',
                            borderRadius: '50%',
                        }}
                    />
                    {width > 767 && <div>{email}</div>}
                </Tooltip>
            </S.HeaderElement>
        </S.Wrapper>
    );
};

export default Header;
