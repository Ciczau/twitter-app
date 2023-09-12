import { TweetType } from 'types/tweets';
import instance from './instance';

export const GetTweetRequest = async (tweetId: string): Promise<TweetType> => {
    const res = await instance({
        url: '/tweet/getone',
        method: 'POST',
        data: { tweetId: tweetId },
    });
    return res.data.result;
};
export const DeleteTweetRequest = async (
    refreshToken: string,
    tweetId: string
) => {
    await instance({
        url: '/tweet/delete',
        method: 'POST',
        data: { refreshToken: refreshToken, id: tweetId },
    });
};

export const GetAllTweetsRequest = async () => {
    const res = await instance({ url: '/tweet/get', method: 'GET' });
    return res.data.result;
};

export const GetFollowingTweetsRequest = async (nick: string) => {
    const res = await instance({
        url: '/tweets/user/get/following',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};

export const GetPostRepliesRequest = async (postId: string) => {
    const res = await instance({
        url: '/tweet/get/replies',
        method: 'POST',
        data: { tweetId: postId },
    });
    return res.data.result;
};
export const GetSearchedTweetsRequest = async (searchKey: string) => {
    const res = await instance({
        url: '/tweet/get/search',
        method: 'POST',
        data: { key: searchKey },
    });
    return res.data.result;
};
export const GetBookmarksRequest = async (nick: string) => {
    const res = await instance({
        url: '/user/bookmarks',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};
export const GetListTweetsRequest = async (listQuery: string) => {
    const res = await instance({
        url: `/list/get/tweets`,
        method: 'POST',
        data: { listId: listQuery },
    });
    return res.data.result;
};
export const GetCommunityTweetsRequest = async (community: string) => {
    const res = await instance({
        url: `/community/get/tweets`,
        method: 'POST',
        data: { communityId: community },
    });
    return res.data.result;
};
export const GetAllUserCommunitiesTweets = async (nick: string) => {
    const res = await instance({
        url: `/communities/user/get/tweets`,
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};

export const GetProfileTweetsRequest = async (nick, type: string) => {
    const res = await instance({
        url: `/user/${type}`,
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};

export const GetUserLikesRequest = async (nick: string) => {
    const res = await instance({
        url: '/tweet/likes',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};
export const GetUserBookmarksRequest = async (nick: string) => {
    const res = await instance({
        url: '/tweet/bookmarks/get',
        method: 'POST',
        data: { nick: nick },
    });
    return res.data.result;
};

export const HandleTweetEventRequest = async (
    eventType: 'like' | 'bookmark' | 'repost',
    nick: string,
    tweetId: string,
    mode: boolean,
    refreshToken: string
) => {
    await instance({
        url: `/tweet/${eventType}`,
        method: 'POST',
        data: {
            nick: nick,
            tweetId: tweetId,
            mode: mode,
            refreshToken: refreshToken,
        },
    });
};
