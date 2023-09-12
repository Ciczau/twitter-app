import { List } from 'types/list';
import instance from './instance';
import { User } from 'types/user';

export const GetListRequest = async (listId: string): Promise<List> => {
    const res = await instance({
        url: '/list/get',
        method: 'POST',
        data: { id: listId },
    });
    return res.data.result;
};
export const FollowListRequest = async (
    listId: string,
    nick: string,
    isFollowing: boolean
) => {
    await instance({
        url: '/list/follow',
        method: 'POST',
        data: {
            id: listId,
            nick: nick,
            isFollowing: isFollowing,
        },
    });
};

export const CreateListRequest = async (
    creator: User,
    name: string,
    desc: string
): Promise<List> => {
    const res = await instance({
        url: '/lists/create',
        method: 'POST',
        data: { creator: creator, name: name, desc: desc },
    });
    return res.data.newList;
};
export const GetUserListsRequest = async (nick: string): Promise<List[]> => {
    const res = await instance({
        url: '/lists/user/get',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};
export const GetSearchedListsRequest = async (
    searchKey: string
): Promise<List[]> => {
    const res = await instance({
        url: '/lists/get/bykey',
        method: 'POST',
        data: { key: searchKey },
    });
    return res.data.result;
};
export const AddUsersToListRequest = async (
    members: string[],
    name: string,
    desc: string
) => {
    await instance({
        url: '/lists/create/users',
        method: 'POST',
        data: {
            membersArray: members,
            name: name,
            desc: desc,
        },
    });
};
