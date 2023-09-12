import { Community } from 'types/community';
import instance from './instance';

export const GetUserCommunitiesRequest = async (
    nick: string
): Promise<Community[]> => {
    const res = await instance({
        url: '/communities/user/get',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};
export const GetCommunityRequest = async (communityQuery: string) => {
    const res = await instance({
        url: '/community/get',
        method: 'POST',
        data: { id: communityQuery },
    });
    return res.data.result;
};
export const JoinCommunityRequest = async (
    nick: string,
    joined: boolean,
    community: string
) => {
    const res = await instance({
        url: '/community/join',
        method: 'POST',
        data: {
            nick: nick,
            joined: joined,
            community: community,
        },
    });
    return res;
};
export const GetSearchedCommunitiesRequest = async (key: string) => {
    const res = await instance({
        url: '/communities/get/bykey',
        method: 'POST',
        data: { key: key },
    });
    return res.data.result;
};

export const CreateCommunityRequest = async (
    formData: FormData
): Promise<Community> => {
    const res = await instance({
        url: '/community/create',
        method: 'POST',
        data: formData,
    });
    return res.data.newCommunity;
};
