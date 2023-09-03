import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import instance from 'api/instance';

import * as S from './index.styles';
import PostSection from 'containers/PostSection';
import { User } from 'components/BodyContent';
import Tweets from 'components/Tweets';
import { formatDate, formatTimeDifference } from 'components/TimeFormatter';

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
    audienceName = 'Everyone',
    post,
    photoMode,
    user,
    postQuery = '',
    profileQuery = '',
    closeModal = () => {},
}: Props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User>();
    const [tweetAuthor, setTweetAuthor] = useState<User>();
    const [tweet, setTweet] = useState<TweetType>();
    const dateObject = new Date(date);

    const formattedDate = date
        ? !post || (post && isReply)
            ? formatTimeDifference(dateObject)
            : formatDate(dateObject)
        : 0;

    const router = useRouter();

    const getUser = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: nick },
            });
            setTweetAuthor(res.data.user);
        } catch (err) {}
    };

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

    const getPost = async (id: string) => {
        try {
            const res = await instance({
                url: '/tweet/getone',
                method: 'POST',
                data: { tweetId: id },
            });
            setTweet(res.data.result);
        } catch (err) {}
    };
    const getUserByProfile = async () => {
        try {
            const res = await instance({
                url: '/user',
                method: 'POST',
                data: { nick: tweet?.nick },
            });
            if (res.status === 200) {
                setUserProfile(res.data.user);
            }
        } catch (err) {}
    };
    useEffect(() => {
        getPost(_id);
    }, [_id, postQuery]);
    useEffect(() => {
        getUserByProfile();
    }, [tweet]);
    useEffect(() => {
        getUser();
    }, [nick]);

    const renderPhotoView = () => {
        return (
            <>
                {modalVisible && (
                    <PostSection
                        type="photo"
                        user={user}
                        photo={tweet?.imageId}
                        handleModal={() => handleModal('close')}
                    >
                        <Tweets
                            nick={user?.nick}
                            profile={userProfile?.nick}
                            type="post-replies"
                            avatar={userProfile?.avatar}
                            tweet={tweet}
                            photoMode={true}
                            user={user}
                            postQuery={postQuery}
                            profileQuery={profileQuery}
                        />
                    </PostSection>
                )}
            </>
        );
    };
    return (
        <>
            {renderPhotoView()}
            <S.Tweet isReply={isReply}>
                <S.AvatarWrapper>
                    {repost && <S.RepostIcon size="100%" />}
                    {audienceName !== 'Everyone' && (
                        <S.AudienceIcon size="100%" />
                    )}
                    <S.Avatar src={tweetAuthor?.avatar} />
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
                    {audienceName !== 'Everyone' && <div>{audienceName}</div>}
                    <S.TweetHeader post={post && !isReply ? true : false}>
                        <S.User>{tweetAuthor?.name} </S.User>
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
