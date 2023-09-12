import instance from './instance';

export const GetNotificationsRequest = async (nick: string) => {
    const res = await instance({
        url: '/notifications/get',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.nots;
};
