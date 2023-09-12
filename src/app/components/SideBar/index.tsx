import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { menuItems } from 'components/MenuItems';
import { UserContext } from 'components/BodyContent';
import { UserLogoutRequest } from 'api/users';

import * as S from './index.styles';
import { useCookies } from 'react-cookie';

const SideBar = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [cookie, setCookie, deleteCookie] = useCookies();

    const userData = useContext(UserContext);

    const router = useRouter();

    const renderMenu = () => {
        return (
            <>
                {menuItems.map((item, index) => {
                    if (item.mobile === false && item.name !== '') {
                        return (
                            <S.MenuElement
                                onClick={() =>
                                    router.push({
                                        pathname: item.link,
                                        query: {
                                            profile: userData.nick,
                                        },
                                    })
                                }
                                key={index}
                            >
                                <div>{item.icon}</div>
                                <div>{item.name}</div>
                            </S.MenuElement>
                        );
                    }
                })}
            </>
        );
    };
    const handleLogout = async () => {
        try {
            await UserLogoutRequest(userData.nick);
            deleteCookie('refreshToken');
            router.push('/x');
        } catch (err) {}
    };
    return (
        <>
            <S.AvatarToggler
                src={userData?.avatar}
                onClick={() => setModalVisible(true)}
            />
            {modalVisible && (
                <>
                    <S.ModalBackground
                        onClick={() => setModalVisible(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <S.Wrapper
                        animate={{ x: [-500, 0] }}
                        transition={{ type: 'keyframes' }}
                    >
                        <S.Avatar src={userData?.avatar} />
                        <S.UserData>
                            <div>{userData?.name}</div>
                            <p>@{userData?.nick}</p>
                        </S.UserData>
                        {renderMenu()}
                        <S.LogoutButton onClick={handleLogout}>
                            <S.LogoutIcon size="100%" />
                            <div>Logout</div>
                        </S.LogoutButton>
                    </S.Wrapper>
                </>
            )}
        </>
    );
};

export default SideBar;
