import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { font } from 'components/BodyContent';
import { menuItems } from 'components/MenuItems';
import instance from 'api/instance';

import * as S from './index.styles';

const Header = ({ user }) => {
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
    const handleLogout = async () => {
        await instance({
            url: '/user/logout',
            method: 'POST',
            data: { nick: user.nick },
        });
        deleteCookie('refreshToken');
        router.push('/x');
    };
    return (
        <S.Wrapper>
            <S.Header>
                {menuItems.map((item, index) => {
                    const link =
                        item.name === 'Profile' ? `/${user.nick}` : item.link;

                    return (
                        <S.HeaderElement
                            key={index}
                            onClick={() => handleRedirect(link)}
                            isLogo={item.name === '' ? true : false}
                        >
                            <div>{item.icon}</div>
                            {width > 767 && <div>{item.name}</div>}
                        </S.HeaderElement>
                    );
                })}
            </S.Header>
            <S.HeaderElement>
                <S.ToolTip
                    trigger="click"
                    content={
                        <div className={font.className} onClick={handleLogout}>
                            Logout
                        </div>
                    }
                    placement="top"
                    hideArrow={false}
                    color={'primary'}
                    width={width}
                >
                    <S.Avatar src={user.avatarId} />
                    {width > 767 && <div>{user.nick}</div>}
                </S.ToolTip>
            </S.HeaderElement>
        </S.Wrapper>
    );
};

export default Header;
