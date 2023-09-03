import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

import { font } from 'components/BodyContent';
import { menuItems } from 'components/MenuItems';
import instance from 'api/instance';

import * as S from './index.styles';

const Header = ({ user }) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [cookie, setCookie, deleteCookie] = useCookies(['refreshToken']);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleRedirect = (link: string) => {
        router.push({ pathname: link, query: { profile: user.nick } });
    };

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    const handleLogout = async () => {
        try {
            await instance({
                url: '/user/logout',
                method: 'POST',
                data: { nick: user.nick },
            });
            deleteCookie('refreshToken');
            router.push('/x');
        } catch (err) {}
    };
    function closeResultListener(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setModalVisible(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    const modalRef = useRef(null);
    closeResultListener(modalRef);
    return (
        <S.Wrapper>
            <S.Header>
                {menuItems.map((item, index) => {
                    return (
                        <S.HeaderElement
                            key={index}
                            onClick={() => handleRedirect(item.link)}
                            isLogo={item.name === '' ? true : false}
                        >
                            <div>{item.icon}</div>
                            {width > 767 && <div>{item.name}</div>}
                        </S.HeaderElement>
                    );
                })}
            </S.Header>
            <S.ProfileElement>
                {modalVisible && (
                    <S.ToolTip onClick={handleLogout} ref={modalRef}>
                        Log out @{user.nick}
                    </S.ToolTip>
                )}
                <S.HeaderElement onClick={() => setModalVisible(!modalVisible)}>
                    <S.Avatar src={user.avatar} />
                    {width > 767 && <div>{user.nick}</div>}
                </S.HeaderElement>
            </S.ProfileElement>
        </S.Wrapper>
    );
};

export default Header;
