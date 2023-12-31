import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import { User } from 'types/user';
import {
    ModalBackground,
    ModalWrapper,
    UserAvatar,
    UserNick,
} from '../index.styles';
import instance from 'api/instance';
import Loader from 'components/Loader';
import { cacheImages } from 'hooks/cacheImages';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { SendMessageRequest } from 'api/chat';

const ChatSection = ({ chat, chatQuery, width }) => {
    const [selectedChat, setSelectedChat] = useState<{
        id: string;
        user: User;
    }>();
    const [chatContent, setChatContent] = useState<
        Array<{
            sender: string;
            receiver: string;
            message: string;
            image: string;
        }>
    >([]);
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<string>();
    const [modal, setModal] = useState<{ visible: boolean; image: string }>();
    const [cookie] = useCookies(['refreshToken']);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [wss, setWebSocket] = useState<WebSocket | null>(null);

    const user = useContext(UserContext);

    useEffect(() => {
        const socket = new WebSocket(
            'wss://ciczau-twitter-backend-e83fca20f698.herokuapp.com'
        );

        setWebSocket(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    if (wss) {
        wss.onmessage = (e) => {
            if (e.data !== 'ping') {
                const data = JSON.parse(e.data);

                if (
                    data.message?.id === chatQuery ||
                    data.image?.id === chatQuery
                ) {
                    const chat: Array<{
                        sender: string;
                        receiver: string;
                        message: string;
                        image: string;
                    }> = [...chatContent];
                    if (data.image) {
                        delete data.image.id;
                        chat.unshift(data.image);
                    }
                    if (data.message) {
                        delete data.message.id;
                        chat.unshift(data.message);
                    }

                    setChatContent(chat);
                }
            } else {
                wss.send('ping');
            }
        };
    }

    const router = useRouter();

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleImage = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    };
    const handleModal = (visible: boolean, image: string) => {
        const pathParts = image.split('/');

        setModal({ visible: visible, image: image });
        router.replace(
            { pathname: router.pathname, query: { chat: chatQuery } },
            {
                pathname: visible
                    ? `/messages/${chatQuery}/media/${pathParts[6]}`
                    : router.pathname,
            }
        );
    };
    const sendMessage = async () => {
        setMessage('');

        if (selectedChat) {
            try {
                const formData = new FormData();
                formData.append('sender', user.nick);
                formData.append('receiver', selectedChat.user.nick);
                formData.append('message', message);
                formData.append('id', selectedChat.id);
                formData.append('refreshToken', cookie.refreshToken);

                if (file && image) {
                    formData.append('file', file);
                    const img = new Image();
                    img.src = image;
                }
                setImage('');

                const res = await SendMessageRequest(formData);

                if (res.status === 200 && wss) {
                    wss.send(
                        JSON.stringify({
                            message: message !== '' && {
                                sender: user.nick,
                                receiver: selectedChat.user.nick,
                                message: message,
                                image: '',
                                id: selectedChat.id,
                            },
                            image: res.data.imageUrl && {
                                sender: user.nick,
                                receiver: selectedChat.user.nick,
                                message: message,
                                image: res.data.imageUrl,
                                id: selectedChat.id,
                            },
                        })
                    );
                }
            } catch (err) {}
        }
    };
    const renderChatContent = () => {
        return (
            <>
                {chatContent.map((message, index) => {
                    if (message.sender === user.nick) {
                        if (message.image !== '') {
                            return (
                                <S.SenderMessageWrapper key={index}>
                                    <S.Image
                                        src={message.image}
                                        onClick={() =>
                                            handleModal(true, message.image)
                                        }
                                    />
                                </S.SenderMessageWrapper>
                            );
                        } else {
                            return (
                                <S.SenderMessageWrapper key={index}>
                                    <S.SenderMessage>
                                        {message.message}
                                    </S.SenderMessage>
                                </S.SenderMessageWrapper>
                            );
                        }
                    } else {
                        if (message.image !== '') {
                            return (
                                <S.ReceiverMessageWrapper key={index}>
                                    <S.Image
                                        src={message.image}
                                        onClick={() =>
                                            setModal({
                                                visible: true,
                                                image: message.image,
                                            })
                                        }
                                    />
                                </S.ReceiverMessageWrapper>
                            );
                        } else {
                            return (
                                <S.ReceiverMessageWrapper key={index}>
                                    <S.ReceiverMessage>
                                        {message.message}
                                    </S.ReceiverMessage>
                                </S.ReceiverMessageWrapper>
                            );
                        }
                    }
                })}
            </>
        );
    };

    const getChat = async () => {
        try {
            const res = await instance({
                url: '/chat/get',
                method: 'POST',
                data: { id: selectedChat?.id },
            });
            const chat = res.data.chat;
            const imagesArray: string[] = [];

            chat.forEach((message) => {
                if (message.image) {
                    imagesArray.push(message.image);
                }
            });
            await cacheImages(imagesArray, setLoaded);
            setChatContent(res.data.chat);
        } catch (err) {}
    };
    useEffect(() => {
        setSelectedChat(chat[0]);
    }, [chat]);
    useEffect(() => {
        getChat();
    }, [selectedChat]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {modal?.visible && (
                <ModalWrapper>
                    <ModalBackground />
                    <S.CloseModalIcon onClick={() => handleModal(false, '')} />
                    <S.ModalImage src={modal.image} />
                </ModalWrapper>
            )}
            <S.Wrapper>
                {selectedChat && (
                    <>
                        <S.HeaderWrapper>
                            {width < 1100 && (
                                <S.Header>
                                    <S.LeftArrowIcon
                                        size="100%"
                                        onClick={() => router.push('/messages')}
                                    />
                                </S.Header>
                            )}
                            <S.UserWrapper>
                                <UserAvatar src={selectedChat?.user.avatar} />
                                <div>{selectedChat?.user.name}</div>
                                <UserNick>@{selectedChat?.user.nick} </UserNick>
                            </S.UserWrapper>
                        </S.HeaderWrapper>
                        <S.ChatWindowWrapper>
                            {isLoaded ? renderChatContent() : <Loader />}
                        </S.ChatWindowWrapper>
                        <S.InputContainer>
                            <S.InputWrapper>
                                <div>
                                    {!image && (
                                        <>
                                            <input
                                                type="file"
                                                hidden
                                                id="imageInput"
                                                accept="image/*"
                                                onChange={handleImage}
                                            />
                                            <label htmlFor="imageInput">
                                                <S.AddImageIcon size="100%" />
                                            </label>

                                            {/*  <S.EmojiListIcon size="100%" />*/}
                                        </>
                                    )}
                                    <S.InputImageWrapper>
                                        {image && (
                                            <S.ImageContainer>
                                                <S.ImageWrapper>
                                                    <S.Image src={image} />
                                                    <S.DeleteImageButton
                                                        onClick={() =>
                                                            setImage('')
                                                        }
                                                    />
                                                </S.ImageWrapper>
                                            </S.ImageContainer>
                                        )}
                                        <S.Input
                                            type="text"
                                            placeholder="Start a new message"
                                            onChange={handleChange}
                                            onKeyPress={handleKeyPress}
                                            value={message}
                                        />
                                    </S.InputImageWrapper>
                                </div>
                                <S.SendButton
                                    size="100%"
                                    onClick={sendMessage}
                                />
                            </S.InputWrapper>
                        </S.InputContainer>
                    </>
                )}
            </S.Wrapper>
        </>
    );
};

export default ChatSection;
