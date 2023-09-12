import { User } from 'types/user';
import instance from './instance';

export const LoginRegisterRequest = async (type: string, data) => {
    const response = await instance({
        url: `/user/${type}`,
        method: 'POST',
        data: {
            email: data.email,
            nick: data.nick,
            password: data.password,
            repeatPassword: data.repassword,
        },
    });
    return response;
};
export const EditProfileRequest = async (formData: FormData) => {
    await instance({
        url: '/user/edit',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
export const GetUserRequest = async (nick: string): Promise<User> => {
    const res = await instance({
        url: '/user',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.user;
};
export const HandleFollowRequest = async (
    user: string,
    userToFollow: string,
    type: string
) => {
    const res = await instance({
        url: `/follow/${type}`,
        method: 'POST',
        data: { user: user, userToFollow: userToFollow },
    });
    return res;
};

export const GetFollowingUsersRequest = async (user: string) => {
    const res = await instance({
        url: '/follow/following',
        method: 'POST',
        data: { user: user },
    });
    return res.data.list;
};
export const GetSearchedUsersRequest = async (searchKey: string) => {
    const res = await instance({
        url: '/users/get/search',
        method: 'POST',
        data: { key: searchKey },
    });
    return res.data.result;
};

export const GetSearchedUsersForChatRequest = async (
    nick: string,
    searchKey: string
) => {
    const res = await instance({
        url: '/users/get/follow',
        method: 'POST',
        data: { nick: nick, key: searchKey },
    });
    return res.data.result;
};

export const CheckIfFollowingRequest = async (
    follower: string,
    following: string
) => {
    const res = await instance({
        url: '/follow/check',
        method: 'POST',
        data: { follower: follower, following: following },
    });
    return res.data.result;
};
export const UserLogoutRequest = async (nick: string) => {
    await instance({
        url: '/user/logout',
        method: 'POST',
        data: { nick: nick },
    });
};
