import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

import { menuItems } from 'components/MenuItems';
import instance from 'api/instance';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { UserLogoutRequest } from 'api/users';

const Header = ({ activeHeaderItem }) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [opacity, setOpacity] = useState<number>(1);
    const [cookie, setCookie, deleteCookie] = useCookies(['refreshToken']);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const router = useRouter();

    const user = useContext(UserContext);

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
    useEffect(() => {
        const wrapper = document.getElementById('main');

        if (wrapper) {
            const handleScroll = () => {
                let value: number = 0.5;
                if (wrapper.scrollTop < 150) {
                    value = (wrapper.scrollTop / 150) * 0.5;
                }
                value = 1 - value;
                setOpacity(value);
            };
            wrapper.addEventListener('scroll', handleScroll);
            return () => {
                wrapper.removeEventListener('scroll', handleScroll);
            };
        }
    });

    const handleLogout = async () => {
        try {
            await UserLogoutRequest(user.nick);
            deleteCookie('refreshToken');
            router.push('/x');
        } catch (err) {}
    };
    function CloseResultListener(ref) {
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
    CloseResultListener(modalRef);
    const renderHeader = () => {
        return (
            <S.Header>
                {menuItems.map((item, index) => {
                    return (
                        <S.HeaderElement
                            key={index}
                            onClick={() => handleRedirect(item.link)}
                            isLogo={item.name === '' ? true : false}
                            mobileView={item.mobile}
                        >
                            {item.name === activeHeaderItem ? (
                                <div>{item.activeIcon}</div>
                            ) : (
                                <div>{item.icon}</div>
                            )}
                            {width > 767 && <div>{item.name}</div>}
                        </S.HeaderElement>
                    );
                })}
            </S.Header>
        );
    };
    return (
        <S.Wrapper opacity={opacity}>
            {renderHeader()}
            <S.ProfileElement>
                {modalVisible && (
                    <S.ToolTip onClick={handleLogout} ref={modalRef}>
                        Log out @{user.nick}
                    </S.ToolTip>
                )}
                <S.HeaderElement onClick={() => setModalVisible(!modalVisible)}>
                    <S.Avatar src={user.avatar} />
                    <div>{user.nick}</div>
                </S.HeaderElement>
            </S.ProfileElement>
        </S.Wrapper>
    );
};

export default Header;
