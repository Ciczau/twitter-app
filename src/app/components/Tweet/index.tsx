import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import instance from 'api/instance';

import * as S from './index.styles';
import PostSection from 'containers/PostSection';
import { User } from 'components/BodyContent';
import Tweets from 'components/Tweets';

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
    reposts: number;
    bookmarks: number;
    repost?: { nick: string; date: string } | null;
    repostBy?: Array<{ nick: string; date: string }> | null;
}

interface Props extends TweetType {
    onTweetLike?: () => void;
    onReplyModeUpdate?: () => void;
    onBookmarkChange?: () => void;
    onTweetRepost?: () => void;
    parentTweet: TweetType | null;
    isLiked: boolean;

    isReposted?: boolean;
    bookmark: boolean;
    isReply: boolean;
    post: boolean;
    photoMode: boolean;
    user: User;
    postQuery?: string;
    profileQuery?: string;
    closeModal?: (id: string) => void;
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
    reposts,
    repostBy,
    isReposted,
    bookmarks,
    onTweetLike = () => {},
    onReplyModeUpdate = () => {},
    onBookmarkChange = () => {},
    onTweetRepost = () => {},
    parentTweet,
    isLiked,
    bookmark,
    repost,
    isReply,
    post,
    photoMode,
    user,
    postQuery = '',
    profileQuery = '',
    closeModal = () => {},
}: Props) => {
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User>();
    const [tweet, setTweet] = useState<TweetType>();
    const dateObject = new Date(date);
    const router = useRouter();
    const getUser = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: nick },
            });
            setAvatar(res.data.avatar);
            setName(res.data.name);
        } catch (err) {}
    };
    useEffect(() => {
        getUser();
    }, [nick]);
    const formattedDate = date
        ? !post || (post && isReply)
            ? formatTimeDifference(dateObject)
            : formatDate(dateObject)
        : 0;

    const handleModal = (type: string) => {
        closeModal(_id);
        getPost(_id);
        router.replace(
            {
                pathname: `${router.pathname}`,
                query: { profile: profileQuery, post: postQuery },
            },
            {
                pathname:
                    type === 'open'
                        ? `/${nick}/status/${_id}/photo`
                        : `${router.pathname}`,
            },
            { shallow: true }
        );
        setModalVisible(type === 'open' ? true : false);
    };

    const closePreviousModal = (id: string) => {
        console.log(id + 'cipka');
        getPost(id);
    };
    const getPost = async (id: string) => {
        try {
            const res = await instance({
                url: '/tweet/getone',
                method: 'POST',
                data: { tweetId: id },
            });

            setTweet(res.data.result);
        } catch (err) {
            console.error(err);
        }
    };
    const getUserByProfile = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: tweet?.nick },
            });
            if (res.status === 200) {
                const nick = tweet?.nick;
                if (typeof nick === 'string') {
                    const userData: User = {
                        nick: nick,
                        name: res.data.name,
                        bio: res.data.bio,
                        avatarId: res.data.avatar,
                        followers: res.data.followers,
                        following: res.data.following,
                        tweets: res.data.tweets,
                    };
                    setUserProfile(userData);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getPost(_id);
    }, [_id, postQuery]);
    useEffect(() => {
        getUserByProfile();
    }, [tweet]);
    return (
        <>
            {modalVisible && (
                <PostSection
                    type="photo"
                    user={user}
                    photo={tweet?.imageId}
                    child={
                        <Tweets
                            nick={user?.nick}
                            profile={userProfile?.nick}
                            type="post-replies"
                            avatar={userProfile?.avatarId}
                            tweet={tweet}
                            photoMode={true}
                            user={user}
                            postQuery={postQuery}
                            profileQuery={profileQuery}
                            closeModal={(id) => closePreviousModal(id)}
                        />
                    }
                    handleModal={() => handleModal('close')}
                />
            )}

            <S.Tweet isReply={isReply}>
                <S.AvatarWrapper>
                    {repost && <S.RepostIcon size="100%" />}
                    <S.Avatar src={avatar} />
                    {isReply && <S.VerticalLine />}
                </S.AvatarWrapper>
                <S.TweetContent>
                    {repost && (
                        <div>
                            {repost.nick === user.nick ? (
                                <>You </>
                            ) : (
                                <>{repost.nick} </>
                            )}
                            reposted
                        </div>
                    )}
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
                                            router.push(
                                                `/${nick}/status/${_id}`
                                            )
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
                                onClick={() => handleModal('open')}
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
                            <S.IconContainer type="like">
                                {isLiked ? (
                                    <>
                                        <S.IconWrapper type="like">
                                            <S.FullHeartIcon
                                                onClick={onTweetLike}
                                                size="100%"
                                            />
                                        </S.IconWrapper>
                                    </>
                                ) : (
                                    <>
                                        <S.IconWrapper type="like">
                                            <S.EmptyHeartIcon
                                                onClick={onTweetLike}
                                                size="100%"
                                            />
                                        </S.IconWrapper>
                                    </>
                                )}
                                <S.Counter isLiked={isLiked}>{likes}</S.Counter>
                            </S.IconContainer>
                            <S.IconContainer type="repost">
                                <S.IconWrapper
                                    type="repost"
                                    onClick={onTweetRepost}
                                >
                                    <S.RepostIcon
                                        size="100%"
                                        isReposted={isReposted}
                                    />
                                </S.IconWrapper>
                                <S.Counter isReposted={isReposted}>
                                    {reposts}
                                </S.Counter>
                            </S.IconContainer>
                            <S.IconContainer type="retweet">
                                <S.IconWrapper type="retweet">
                                    <S.RetweetIcon
                                        size="100%"
                                        onClick={onReplyModeUpdate}
                                    />
                                </S.IconWrapper>
                                <S.Counter>{retweets}</S.Counter>
                            </S.IconContainer>
                            <S.IconContainer type="view">
                                <S.IconWrapper type="view">
                                    <S.ViewsIcon size="70%" />
                                </S.IconWrapper>
                                <S.Counter>{views}</S.Counter>
                            </S.IconContainer>
                        </S.IconsWrapper>
                    )}
                    {post && !isReply && (
                        <>
                            <S.StatsBar>
                                <S.WhiteColor>{retweets}</S.WhiteColor>
                                <div>Retweets</div>
                                <S.WhiteColor>{likes}</S.WhiteColor>
                                <div>Likes</div>
                                <S.WhiteColor>{bookmarks}</S.WhiteColor>
                                <div>Bookmarks</div>
                            </S.StatsBar>
                            <S.HorizontalLine />
                            <S.IconsBar>
                                <S.IconContainer type="like">
                                    {isLiked ? (
                                        <S.IconWrapper type="like">
                                            <S.FullHeartIcon
                                                onClick={onTweetLike}
                                                size="100%"
                                            />
                                        </S.IconWrapper>
                                    ) : (
                                        <S.IconWrapper type="like">
                                            <S.EmptyHeartIcon
                                                onClick={onTweetLike}
                                                size="100%"
                                            />
                                        </S.IconWrapper>
                                    )}
                                </S.IconContainer>
                                <S.IconContainer type="retweet">
                                    <S.IconWrapper type="retweet">
                                        <S.RetweetIcon
                                            size="100%"
                                            onClick={onReplyModeUpdate}
                                        />
                                    </S.IconWrapper>
                                </S.IconContainer>
                                <S.IconContainer type="bookmark">
                                    {bookmark ? (
                                        <S.IconWrapper type="bookmark">
                                            <S.BookmarkIconChecked
                                                size="100%"
                                                onClick={onBookmarkChange}
                                            />
                                        </S.IconWrapper>
                                    ) : (
                                        <S.IconWrapper type="bookmark">
                                            {' '}
                                            <S.BookmarkIcon
                                                size="100%"
                                                onClick={onBookmarkChange}
                                            />
                                        </S.IconWrapper>
                                    )}
                                </S.IconContainer>
                            </S.IconsBar>
                        </>
                    )}
                </S.TweetContent>
            </S.Tweet>
        </>
    );
};

export default Tweet;
