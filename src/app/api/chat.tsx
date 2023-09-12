import instance from './instance';

export const CreateChatRequest = async (
    firstUser: string,
    secondUser: string
) => {
    const res = await instance({
        url: '/chat/create',
        method: 'POST',
        data: {
            firstUser: firstUser,
            secondUser: secondUser,
        },
    });
    return res;
};

export const GetUserChatsRequest = async (nick: string) => {
    const res = await instance({
        url: '/chats/get',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.tab;
};

export const SendMessageRequest = async (formData: FormData) => {
    const res = await instance({
        url: '/chat/message/send',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
