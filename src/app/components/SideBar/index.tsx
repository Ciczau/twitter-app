import { useState } from 'react';
import { useRouter } from 'next/router';

import { menuItems } from 'components/MenuItems';

import * as S from './index.styles';

const SideBar = ({ user }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const router = useRouter();
    return (
        <>
            <S.AvatarToggler
                src={user?.avatar}
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
                        <S.Avatar src={user?.avatar} />
                        <S.UserData>
                            <div>{user?.name}</div>
                            <p>@{user?.nick}</p>
                        </S.UserData>
                        {menuItems.map((item, index) => {
                            if (item.mobile === false && item.name !== '') {
                                return (
                                    <S.MenuElement
                                        onClick={() =>
                                            router.push({
                                                pathname: item.link,
                                                query: { profile: user?.nick },
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
                    </S.Wrapper>
                </>
            )}
        </>
    );
};

export default SideBar;
