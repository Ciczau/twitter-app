import { User } from './user';

export interface TweetType {
    date: string;
    nick: string;
    text: string;
    _id: string;
    likes: number;
    parentId: string;
    imageId: string;
    views: number;
    retweets: number;
    audienceName?: string;
    reposts: number;
    bookmarks: number;
    repost?: { nick: string; date: string } | null;
    repostBy?: Array<{ nick: string; date: string }> | null;
}

export type TweetsType = {
    profile?: string | null;
    type: string;
    avatar: string | undefined;
    tweet?: TweetType | null;
    photoMode: boolean;
    community?: string;
    postQuery?: string;
    profileQuery?: string;
    listQuery?: string;
    searchKey?: string;
    activeTab?: string;
    closeModal?: (id: string) => void;
    isEmpty?: (data: boolean) => void;
};
