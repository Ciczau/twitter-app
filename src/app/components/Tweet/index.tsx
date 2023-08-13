import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';

import * as S from './index.styles';

export interface TweetType {
    date: string;
    nick: string;
    text: string;
    _id: string;
    likes: number;
    parentId: string;
    views: number;
    retweets: number;
}

interface Props extends TweetType {
    onTweetLike: () => void;
    onReplyModeUpdate: () => void;
    parentTweet: TweetType | null;
    isLiked: boolean;
    isReply: boolean;
}

function formatTimeDifference(date: Date): string {
    const now: Date = new Date();
    const timeDifference: number = now.getTime() - date.getTime();

    if (timeDifference < 60000) {
        // Mniej niż 1 minuta
        return Math.floor(timeDifference / 1000) + 's';
    } else if (timeDifference < 3600000) {
        // Mniej niż 1 godzina
        return Math.floor(timeDifference / 60000) + 'm';
    } else if (timeDifference < 86400000) {
        // Mniej niż 24 godziny
        return Math.floor(timeDifference / 3600000) + 'h';
    } else if (now.getFullYear() !== date.getFullYear()) {
        // Różny rok
        const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return dateFormatter.format(date) + ' ' + date.getFullYear();
    } else {
        // Wszystko inne (dni i miesiąc)
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
    views,
    retweets,
    onTweetLike,
    onReplyModeUpdate,
    parentTweet,
    isLiked,
    isReply,
}: Props) => {
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dateObject = new Date(date);

    const getUser = async () => {
        const res = await axios.post('http://localhost:5000/user', {
            nick: nick,
        });
        setAvatar(res.data.avatar);
        setName(res.data.name);
    };

    useEffect(() => {
        getUser();
    }, [nick]);

    const formattedDate = formatTimeDifference(dateObject);
    return (
        <S.Tweet isReply={isReply}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <S.Avatar src={avatar} />
                {isReply && (
                    <div
                        style={{
                            height: 'calc(100% - 50px)',
                            width: '1px',
                            marginTop: '10px',
                            paddingBottom: '30px',
                            backgroundColor: 'gray',
                        }}
                    ></div>
                )}
            </div>
            <S.TweetContent>
                <S.TweetHeader>
                    <S.User>{name} </S.User>
                    <S.Date>{formattedDate}</S.Date>
                </S.TweetHeader>

                {parentId && !isReply && (
                    <div
                        style={{
                            color: 'gray',
                            display: 'flex',
                        }}
                    >
                        Replying to&nbsp;
                        <S.LinkWrapper href={`/${parentTweet?.nick}`}>
                            @{parentTweet?.nick}
                        </S.LinkWrapper>
                    </div>
                )}
                <div>{text}</div>
                {!isReply && (
                    <S.IconsWrapper>
                        <S.IconWrapper>
                            {isLiked ? (
                                <>
                                    <AiFillHeart
                                        size="100%"
                                        color="#8d0225"
                                        style={{
                                            width: '25px',
                                        }}
                                        onClick={onTweetLike}
                                    />
                                    <div
                                        style={{
                                            color: '#8d0225',
                                        }}
                                    >
                                        {likes}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <AiOutlineHeart
                                        size="100%"
                                        color="#585858"
                                        style={{
                                            width: '25px',
                                        }}
                                        onClick={onTweetLike}
                                    />
                                    <div>{likes}</div>
                                </>
                            )}
                        </S.IconWrapper>

                        <S.IconWrapper>
                            <HiOutlineChat
                                size="100%"
                                color="#585858"
                                style={{ width: '25px' }}
                                onClick={onReplyModeUpdate}
                            />
                            <div>{retweets}</div>
                        </S.IconWrapper>
                        <S.IconWrapper>
                            <ImStatsBars
                                size="100%"
                                color="#585858"
                                style={{ width: '25px' }}
                            />
                            <div>{views}</div>
                        </S.IconWrapper>
                    </S.IconsWrapper>
                )}
            </S.TweetContent>
        </S.Tweet>
    );
};

export default Tweet;
