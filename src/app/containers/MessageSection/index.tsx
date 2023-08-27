import { useEffect, useState } from 'react';
import * as S from './index.styles';
import axios from 'axios';
import instance from 'api/instance';
import { User } from 'components/BodyContent';
import { useRouter } from 'next/router';
import ChatSection from './ChatSection';

const MessageSection = ({ user, type, chatQuery = '' }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>();
    const [chats, setChats] = useState<Array<{ id: string; user: User }>>();
    const [width, setWidth] = useState<number>(window.innerWidth);

    const router = useRouter();

    const getUsers = async () => {
        try {
            const res = await instance({ url: '/users/all', method: 'GET' });
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        }
    };
    const createTweet = async (choosenUser: User) => {
        try {
            await instance({
                url: '/chat/create',
                method: 'POST',
                data: { firstUser: user?.nick, secondUser: choosenUser.nick },
            });
        } catch (err) {}
    };
    const getChats = async () => {
        try {
            const res = await instance({
                url: '/chats/get',
                method: 'POST',
                data: { nick: user?.nick },
            });
            console.log(res);
            setChats(res.data.tab);
        } catch (err) {}
    };
    useEffect(() => {
        getUsers();

        setWidth(window.innerWidth);
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    useEffect(() => {
        getChats();
    }, [user]);
    return (
        <>
            {modalVisible && (
                <>
                    <S.ModalWrapper>
                        <S.ModalBackground
                            onClick={() => setModalVisible(false)}
                        />
                        <S.Modal>
                            <S.Header>
                                <S.TitleWrapper>
                                    <S.CloseIcon
                                        size="100%"
                                        onClick={() => setModalVisible(false)}
                                    />
                                    <S.Title>New message</S.Title>
                                </S.TitleWrapper>
                            </S.Header>
                            {users?.map((user, index) => {
                                return (
                                    <S.UserWrapper
                                        key={index}
                                        onClick={async () =>
                                            await createTweet(user)
                                        }
                                    >
                                        <S.UserAvatar
                                            src={`https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`}
                                        />
                                        <S.UserContentWrapper>
                                            <div>{user.name}</div>
                                            <S.UserNick>
                                                @{user.nick}
                                            </S.UserNick>
                                        </S.UserContentWrapper>
                                    </S.UserWrapper>
                                );
                            })}
                        </S.Modal>
                    </S.ModalWrapper>
                </>
            )}
            <S.Wrapper>
                {type === 'chats' && (
                    <S.ChatListWrapper
                        openedChat={chatQuery !== '' ? true : false}
                    >
                        <S.Header>
                            <S.Title>Messages</S.Title>
                            <S.NewChatIcon
                                size="100%"
                                onClick={() => setModalVisible(true)}
                            />
                        </S.Header>
                        {chats?.map((chat, index) => {
                            return (
                                <S.UserWrapper
                                    key={index}
                                    onClick={() =>
                                        router.push(`/messages/${chat.id}`)
                                    }
                                >
                                    <S.UserAvatar
                                        src={`https://res.cloudinary.com/df4tupotg/image/upload/${chat.user.avatarId}`}
                                    />
                                    <S.UserContentWrapper>
                                        <div>{chat.user.name}</div>
                                        <S.UserNick>
                                            @{chat.user.nick}
                                        </S.UserNick>
                                    </S.UserContentWrapper>
                                </S.UserWrapper>
                            );
                        })}
                    </S.ChatListWrapper>
                )}
                {type === 'openedChat' && chats && (
                    <ChatSection
                        chat={chats.filter((chat) => chat.id === chatQuery)}
                        user={user}
                        chatQuery={chatQuery}
                        width={width}
                    />
                )}
            </S.Wrapper>
        </>
    );
};

export default MessageSection;
