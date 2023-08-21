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
    photoMode: boolean;
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

function formatDate(date) {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? '0' : ''
    }${minutes} ${ampm}`;
    const formattedDate = `${month} ${day}, ${year}`;

    return `${formattedTime} · ${formattedDate}`;
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
    photoMode,
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

    const formattedDate = date
        ? !post || (post && isReply)
            ? formatTimeDifference(dateObject)
            : formatDate(dateObject)
        : 0;

    return (
        <S.Tweet isReply={isReply}>
            <S.AvatarWrapper>
                <S.Avatar src={avatar} />
                {isReply && <S.VerticalLine />}
            </S.AvatarWrapper>
            <S.TweetContent>
                <S.TweetHeader post={post && !isReply ? true : false}>
                    <S.User>{name} </S.User>
                    <S.UserDate post={post && !isReply ? true : false}>
                        <div onClick={() => router.push(`/${nick}`)}>
                            @{nick}
                        </div>
                        {(!post || (post && isReply)) && (
                            <>
                                <S.Dot>&middot;</S.Dot>
                                <div
                                    onClick={() =>
                                        router.push(`/${nick}/status/${_id}`)
                                    }
                                >
                                    {' '}
                                    {formattedDate}
                                </div>
                            </>
                        )}
                    </S.UserDate>
                </S.TweetHeader>

                {parentId && !isReply && !post && (
                    <S.ReplyingInfo>
                        Replying to&nbsp;
                        <S.LinkWrapper href={`/${parentTweet?.nick}`}>
                            @{parentTweet?.nick}
                        </S.LinkWrapper>
                    </S.ReplyingInfo>
                )}
                <S.Text>{text}</S.Text>
                {imageId !== '' && photoMode !== true && (
                    <S.ImageWrapper>
                        <S.Image
                            src={imageId}
                            onClick={() =>
                                router.push(`/${nick}/status/${_id}/photo`)
                            }
                        />
                    </S.ImageWrapper>
                )}
                {post && !isReply && (
                    <>
                        <S.UserDate post={post}>
                            <div>{formattedDate}</div>
                            <S.Dot>&middot;</S.Dot>
                            <p>{views}</p> <div>Views</div>
                        </S.UserDate>
                        <S.HorizontalLine />
                    </>
                )}

                {((!isReply && !post) || (isReply && post)) && (
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
                {post && !isReply && (
                    <>
                        <S.StatsBar>
                            <S.WhiteColor>{retweets}</S.WhiteColor>
                            <div>Retweets</div>
                            <S.WhiteColor>{likes}</S.WhiteColor>
                            <div>Likes</div>
                        </S.StatsBar>
                        <S.HorizontalLine />
                        <S.IconsBar>
                            {isLiked ? (
                                <S.FullHeartIcon
                                    onClick={onTweetLike}
                                    size="100%"
                                />
                            ) : (
                                <S.EmptyHeartIcon
                                    onClick={onTweetLike}
                                    size="100%"
                                />
                            )}
                            <S.RetweetIcon
                                size="100%"
                                onClick={onReplyModeUpdate}
                            />
                        </S.IconsBar>
                    </>
                )}
            </S.TweetContent>
        </S.Tweet>
    );
};

export default Tweet;
