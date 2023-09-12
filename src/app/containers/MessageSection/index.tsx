import { useEffect, useState, useMemo, useContext } from 'react';

import instance from 'api/instance';
import { User } from 'types/user';
import { useRouter } from 'next/router';
import ChatSection from './ChatSection';
import SideBar from 'components/SideBar';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { GetSearchedUsersForChatRequest } from 'api/users';
import { CreateChatRequest, GetUserChatsRequest } from 'api/chat';

const MessageSection = ({ type, chatQuery = '' }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [users, setUsers] =
        useState<Array<{ user: User; followEachOther: boolean }>>();
    const [chats, setChats] = useState<Array<{ id: string; user: User }>>([]);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const router = useRouter();

    const user = useContext(UserContext);

    const getUsers = async () => {
        try {
            const usersList = await GetSearchedUsersForChatRequest(
                user.nick,
                searchKey
            );
            setUsers(usersList);
        } catch (err) {}
    };
    const handleCreateChat = async (user: {
        user: User;
        followEachOther: boolean;
    }) => {
        await createChat(user);
    };
    const createChat = async (choosenUser: {
        user: User;
        followEachOther: boolean;
    }) => {
        if (choosenUser.followEachOther) {
            try {
                const res = await CreateChatRequest(
                    user.nick,
                    choosenUser.user.nick
                );
                if (res.data.chatId) {
                    router.push(`/messages/${res.data.chatId}`);
                }
                if (res.data.chat) {
                    setModalVisible(false);
                    setChats([...chats, res.data.chat]);
                }
            } catch (err) {}
        }
    };
    const getChats = async () => {
        try {
            const userChats = await GetUserChatsRequest(user.nick);
            setChats(userChats);
        } catch (err) {}
    };

    const handleChange = (e) => {
        setSearchKey(e.target.value);
    };
    const renderChats = () => {
        return (
            <>
                {chats?.map((item, index) => {
                    return (
                        <S.UserWrapper
                            key={index}
                            onClick={() => router.push(`/messages/${item.id}`)}
                            followEachOther={true}
                        >
                            <S.UserAvatar src={item.user.avatar} />
                            <S.UserContentWrapper>
                                <div>{item.user.name}</div>
                                <S.UserNick>@{item.user.nick}</S.UserNick>
                            </S.UserContentWrapper>
                        </S.UserWrapper>
                    );
                })}
            </>
        );
    };
    const renderUsers = () => {
        return (
            <>
                {users?.map((user, index) => {
                    return (
                        <S.UserWrapper
                            key={index}
                            onClick={() => handleCreateChat(user)}
                            followEachOther={user.followEachOther}
                        >
                            <S.UserAvatar src={user.user.avatar} />
                            <S.UserContentWrapper>
                                <div>{user.user.name}</div>
                                <S.UserNick>
                                    <div>@{user.user.nick}</div>
                                    {user.followEachOther && (
                                        <div>You follow each other</div>
                                    )}
                                </S.UserNick>
                            </S.UserContentWrapper>
                        </S.UserWrapper>
                    );
                })}
            </>
        );
    };

    const filter = useMemo(() => {
        return chats.filter((chat) => chat.id === chatQuery);
    }, [chats]);

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
                            {renderUsers()}
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
                            {width < 767 && <SideBar />}
                            <S.Title>Messages</S.Title>
                            <S.NewChatIcon
                                size="100%"
                                onClick={() => setModalVisible(true)}
                            />
                        </S.Header>
                        {renderChats()}
                    </S.ChatListWrapper>
                )}

                {type === 'openedChat' && chats && (
                    <ChatSection
                        chat={filter}
                        chatQuery={chatQuery}
                        width={width}
                    />
                )}
            </S.Wrapper>
        </>
    );
};

export default MessageSection;
