import { useEffect, useState } from 'react';

import instance from 'api/instance';
import { User } from 'components/BodyContent';
import { useRouter } from 'next/router';
import ChatSection from './ChatSection';

import * as S from './index.styles';

const MessageSection = ({ user, type, chatQuery = '' }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [users, setUsers] =
        useState<Array<{ user: User; followEachOther: boolean }>>();
    const [chats, setChats] = useState<Array<{ id: string; user: User }>>();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const router = useRouter();

    const getUsers = async () => {
        try {
            const res = await instance({
                url: '/users/get/follow',
                method: 'POST',
                data: { nick: user?.nick, key: searchKey },
            });
            setUsers(res.data.result);
        } catch (err) {
            console.error(err);
        }
    };
    const createChat = async (choosenUser: {
        user: User;
        followEachOther: boolean;
    }) => {
        if (choosenUser.followEachOther) {
            try {
                const res = await instance({
                    url: '/chat/create',
                    method: 'POST',
                    data: {
                        firstUser: user?.nick,
                        secondUser: choosenUser.user.nick,
                    },
                });
                console.log(res);
                if (res.data.chatId) {
                    router.push(`/messages/${res.data.chatId}`);
                }
            } catch (err) {}
        }
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

    const handleChange = (e) => {
        setSearchKey(e.target.value);
    };

    useEffect(() => {
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
    useEffect(() => {
        getUsers();
        console.log(searchKey);
    }, [user, searchKey]);
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
                            <S.ExploreWrapper>
                                <S.SearchIcon size="100%" focus={focus} />
                                <S.ExploreInput
                                    placeholder="Search"
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    value={searchKey}
                                    onChange={handleChange}
                                />
                            </S.ExploreWrapper>
                            {users?.map((user, index) => {
                                return (
                                    <S.UserWrapper
                                        key={index}
                                        onClick={async () =>
                                            await createChat(user)
                                        }
                                        followEachOther={user.followEachOther}
                                    >
                                        <S.UserAvatar
                                            src={`https://res.cloudinary.com/df4tupotg/image/upload/${user.user.avatarId}`}
                                        />
                                        <S.UserContentWrapper>
                                            <div>{user.user.name}</div>
                                            <S.UserNick>
                                                <div>@{user.user.nick}</div>
                                                {user.followEachOther && (
                                                    <div>
                                                        You follow each other
                                                    </div>
                                                )}
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
                                    followEachOther={true}
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
