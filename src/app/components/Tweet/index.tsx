import * as S from './index.styles';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';
export interface TweetType {
    date: string;
    email: string;
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

const Tweet = ({
    date,
    email,
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
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return (
        <S.Tweet isReply={isReply}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <S.Avatar src="/p2.2.jpeg" />
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
                    <S.User>{email} </S.User>
                    <S.Date>
                        {day}.{month}.{year}
                    </S.Date>
                </S.TweetHeader>

                {parentId && !isReply && (
                    <div
                        style={{
                            color: 'gray',
                            display: 'flex',
                        }}
                    >
                        Replying to&nbsp;
                        <S.LinkWrapper href={`/${parentTweet?.email}`}>
                            @{parentTweet?.email}
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
