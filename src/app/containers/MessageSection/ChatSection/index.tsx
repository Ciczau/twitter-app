import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { User } from 'components/BodyContent';
import {
    ModalBackground,
    ModalWrapper,
    UserAvatar,
    UserNick,
} from '../index.styles';
import { useRouter } from 'next/router';
import instance from 'api/instance';

const ChatSection = ({ chat, user, chatQuery, width }) => {
    const wss = new WebSocket('ws://localhost:5000');

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

    wss.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(chat);
        if (data.message?.id === chatQuery || data.image?.id === chatQuery) {
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

            console.log(chatContent);
            setChatContent(chat);
        }
    };

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
        console.log(pathParts);
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
                console.log(selectedChat.id);
                if (file && image) {
                    formData.append('file', file);
                }
                setImage('');
                const res = await instance({
                    url: '/chat/message/send',
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res);
                if (res.status === 200) {
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

    const getChat = async () => {
        try {
            const res = await instance({
                url: '/chat/get',
                method: 'POST',
                data: { id: selectedChat?.id },
            });
            setChatContent(res.data.chat);
        } catch (err) {}
    };
    useEffect(() => {
        setSelectedChat(chat[0]);
    }, [chat]);
    useEffect(() => {
        getChat();
    }, [selectedChat]);

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
                        <UserAvatar
                            src={`https://res.cloudinary.com/df4tupotg/image/upload/${selectedChat?.user.avatarId}`}
                        />
                        <div>{selectedChat?.user.name}</div>
                        <UserNick>@{selectedChat?.user.nick} </UserNick>
                    </S.UserWrapper>
                </S.HeaderWrapper>
                <S.ChatWindowWrapper>
                    {chatContent.map((message, index) => {
                        if (message.sender === user.nick) {
                            if (message.image !== '') {
                                return (
                                    <S.SenderMessageWrapper>
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
                                    <S.SenderMessageWrapper>
                                        <S.SenderMessage>
                                            {message.message}
                                        </S.SenderMessage>
                                    </S.SenderMessageWrapper>
                                );
                            }
                        } else {
                            if (message.image !== '') {
                                return (
                                    <S.ReceiverMessageWrapper>
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
                                    <S.ReceiverMessageWrapper>
                                        <S.ReceiverMessage>
                                            {message.message}
                                        </S.ReceiverMessage>
                                    </S.ReceiverMessageWrapper>
                                );
                            }
                        }
                    })}
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

                                    <S.EmojiListIcon size="100%" />
                                </>
                            )}
                            <S.InputImageWrapper>
                                {image && (
                                    <S.ImageContainer>
                                        <S.ImageWrapper>
                                            <S.Image src={image} />
                                            <S.DeleteImageButton
                                                onClick={() => setImage('')}
                                            />
                                        </S.ImageWrapper>
                                    </S.ImageContainer>
                                )}
                                <S.Input
                                    type="text"
                                    placeholder="Start a new message"
                                    onChange={handleChange}
                                    value={message}
                                />
                            </S.InputImageWrapper>
                        </div>
                        <S.SendButton size="100%" onClick={sendMessage} />
                    </S.InputWrapper>
                </S.InputContainer>
            </S.Wrapper>
        </>
    );
};

export default ChatSection;
