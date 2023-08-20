import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import instance from 'api/instance';

import * as S from './index.styles';

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
}

interface Props extends TweetType {
    onTweetLike: () => void;
    onReplyModeUpdate: () => void;
    parentTweet: TweetType | null;
    isLiked: boolean;
    isReply: boolean;
    post: boolean;
}

function formatTimeDifference(date: Date): string {
    const now: Date = new Date();
    const timeDifference: number = now.getTime() - date.getTime();

    if (timeDifference < 60000) {
        return Math.floor(timeDifference / 1000) + 's';
    } else if (timeDifference < 3600000) {
        return Math.floor(timeDifference / 60000) + 'm';
    } else if (timeDifference < 86400000) {
        return Math.floor(timeDifference / 3600000) + 'h';
    } else if (now.getFullYear() !== date.getFullYear()) {
        const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return dateFormatter.format(date) + ' ' + date.getFullYear();
    } else {
        const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
            month: 'long',
            day: 'numeric',
        });
        return dateFormatter.format(date);
    }
}

const Tweet = ({
    date,
    nick,
    text,
    _id,
    likes,
    parentId,
    imageId,
    views,
    retweets,
    onTweetLike,
    onReplyModeUpdate,
    parentTweet,
    isLiked,
    isReply,
    post,
}: Props) => {
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>('');

    const dateObject = new Date(date);
    const router = useRouter();

    const getUser = async () => {
        const res = await instance({
            url: '/user',
            method: 'POST',
            data: { nick: nick },
        });
        setAvatar(res.data.avatar);
        setName(res.data.name);
    };

    useEffect(() => {
        getUser();
    }, [nick]);

    const formattedDate = date ? formatTimeDifference(dateObject) : 0;
    return (
        <S.Tweet isReply={isReply}>
            <S.AvatarWrapper>
                <S.Avatar src={avatar} />
                {isReply && <S.VerticalLine />}
            </S.AvatarWrapper>
            <S.TweetContent>
                <S.TweetHeader>
                    <S.User>{name} </S.User>
                    <S.UserDate>
                        <div onClick={() => router.push(`/${nick}`)}>
                            @{nick}
                        </div>
                        <S.Dot>&middot;</S.Dot>
                        <div
                            onClick={() =>
                                router.push(`/${nick}/status/${_id}`)
                            }
                        >
                            {' '}
                            {formattedDate}
                        </div>
                    </S.UserDate>
                </S.TweetHeader>

                {parentId && !isReply && (
                    <S.ReplyingInfo>
                        Replying to&nbsp;
                        <S.LinkWrapper href={`/${parentTweet?.nick}`}>
                            @{parentTweet?.nick}
                        </S.LinkWrapper>
                    </S.ReplyingInfo>
                )}
                <div>{text}</div>
                {imageId !== '' && <S.Image src={imageId} />}
                {!isReply && (
                    <S.IconsWrapper>
                        <S.IconWrapper>
                            {isLiked ? (
                                <>
                                    <S.FullHeartIcon
                                        onClick={onTweetLike}
                                        size="100%"
                                    />
                                    <S.LikeCounter>{likes}</S.LikeCounter>
                                </>
                            ) : (
                                <>
                                    <S.EmptyHeartIcon
                                        onClick={onTweetLike}
                                        size="100%"
                                    />
                                    <div>{likes}</div>
                                </>
                            )}
                        </S.IconWrapper>

                        <S.IconWrapper>
                            <S.RetweetIcon
                                size="100%"
                                onClick={onReplyModeUpdate}
                            />
                            <div>{retweets}</div>
                        </S.IconWrapper>
                        <S.IconWrapper>
                            <S.ViewsIcon size="100%" />
                            <div>{views}</div>
                        </S.IconWrapper>
                    </S.IconsWrapper>
                )}
            </S.TweetContent>
        </S.Tweet>
    );
};

export default Tweet;
