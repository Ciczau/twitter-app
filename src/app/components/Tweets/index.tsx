import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Tweet, { TweetType } from 'components/Tweet';
import instance from 'api/instance';
import TweetCreator from 'components/TweetCreator';
import { User } from 'components/BodyContent';
import Loader from 'components/Loader';
import { cacheImages } from 'hooks/cacheImages';

import * as S from './index.styles';

type TweetsType = {
    nick: string | undefined;
    profile?: string | null;
    type: string;
    avatar: string | undefined;
    tweet?: TweetType | null;
    photoMode: boolean;
    user: User;
    community?: string;
    postQuery?: string;
    profileQuery?: string;
    listQuery?: string;
    searchKey?: string;
    activeTab?: string;
    closeModal?: (id: string) => void;
    isEmpty?: (data: boolean) => void;
};

const Tweets: React.FC<TweetsType> = ({
    nick,
    profile,
    type,
    avatar,
    tweet = null,
    photoMode,
    user,
    community = '',
    postQuery = '',
    profileQuery = '',
    listQuery = '',
    searchKey = '',
    activeTab = '',
    closeModal = (id: string) => {},
    isEmpty = (data: boolean) => {},
}) => {
    const [post, setPost] = useState<TweetType>();
    const [text, setText] = useState<string>('');
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const [postParent, setPostParent] = useState<TweetType | null>(null);
    const [parents, setParents] = useState<TweetType[]>([]);
    const [likes, setLikes] = useState<Array<string>>([]);
    const [bookmarks, setBookmarks] = useState<Array<string>>([]);
    const [file, setFile] = useState<string>('');
    const [replyMode, setReplyMode] = useState<boolean>(false);
    const [replyTarget, setReplyTarget] = useState<TweetType>();
    const [cookie] = useCookies(['refreshToken']);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const createTweet = async (id: string, name: string) => {
        setText('');
        setFile('');
        try {
            let parentId = replyTarget?._id;
            if (replyMode === false && post) {
                parentId = post._id;
            }
            const formData = new FormData();
            if (nick) {
                formData.append('nick', nick);
            }
            formData.append('text', text);
            if (parentId) {
                formData.append('parentId', parentId);
            }
            formData.append('file', file);
            formData.append('audienceName', name);
            formData.append('audience', id);
            formData.append('refreshToken', cookie.refreshToken);

            const res = await instance({
                url: '/tweet/create',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleReplyMode(false);

            if (res.status === 200) {
                if (type !== 'notificationTweet' && id === '') {
                    setTweets((prevTweets) => [
                        res.data.newTweet,
                        ...prevTweets,
                    ]);
                }
                if (replyTarget === tweet && post) {
                    let temp = post;
                    temp.retweets = temp.retweets + 1;
                } else {
                    setTweets((prevTweets) =>
                        prevTweets.map((tweet) => {
                            if (tweet._id === replyTarget?._id) {
                                return {
                                    ...tweet,
                                    retweets: tweet.retweets + 1,
                                };
                            }
                            return tweet;
                        })
                    );
                }
            }
        } catch (err) {}
    };

    const getTweets = async () => {
        try {
            let res;

            if (type === 'home' && activeTab === 'popular') {
                res = await instance({ url: '/tweet/get', method: 'GET' });
            } else if (type === 'home' && activeTab === 'following') {
                res = await instance({
                    url: '/tweets/user/get/following',
                    method: 'POST',
                    data: { nick: nick },
                });
            } else if (type === 'post-replies') {
                res = await instance({
                    url: '/tweet/get/replies',
                    method: 'POST',
                    data: { tweetId: post?._id },
                });
            } else if (type === 'search') {
                res = await instance({
                    url: '/tweet/get/search',
                    method: 'POST',
                    data: { key: searchKey },
                });
            } else if (type === 'bookmarks') {
                res = await instance({
                    url: '/user/bookmarks',
                    method: 'POST',
                    data: { nick: nick },
                });
            } else if (type === 'notificationTweet') {
                res = await instance({
                    url: '/tweet/getone',
                    method: 'POST',
                    data: { tweetId: tweet?._id },
                });
            } else if (type === 'list') {
                res = await instance({
                    url: `/list/get/tweets`,
                    method: 'POST',
                    data: { listId: listQuery },
                });
            } else if (type === 'community') {
                res = await instance({
                    url: `/community/get/tweets`,
                    method: 'POST',
                    data: { communityId: community },
                });
            } else if (type === 'communities') {
                res = await instance({
                    url: `/communities/user/get/tweets`,
                    method: 'POST',
                    data: { nick: nick },
                });
            } else {
                res = await instance({
                    url: `/user/${type}`,
                    method: 'POST',
                    data: { nick: profile },
                });
            }
            console.log(res);
            const likes = await instance({
                url: '/tweet/likes',
                method: 'POST',
                data: { nick: nick },
            });
            const bookmarks = await instance({
                url: '/tweet/bookmarks/get',
                method: 'POST',
                data: { nick: nick },
            });
            if (res.data.result.length === 0) {
                isEmpty(true);
            } else {
                isEmpty(false);
            }
            setBookmarks(bookmarks.data.result);
            setLikes(likes.data.result);
            const imagesArray: string[] = [user.avatar];
            const tweetList: TweetType[] = res.data.result;
            tweetList.forEach((tweet) => {
                if (tweet.imageId !== '') {
                    imagesArray.push(tweet.imageId);
                }
            });

            if (type !== 'notificationTweet') {
                setTweets(res.data.result);
            }
            if (type === 'notificationTweet' && !post) {
                setPost(res.data.result);
                setReplyTarget(res.data.result);
            }
            await cacheImages(imagesArray, setImagesLoaded);
        } catch (err) {}
    };

    const handleTweetEvent = async (
        targetTweet: TweetType,
        eventType: 'like' | 'bookmark' | 'repost'
    ) => {
        let isEventExecuted: boolean = false;
        if (eventType === 'like') {
            isEventExecuted = likes.includes(targetTweet._id);
            if (isEventExecuted) {
                setLikes(likes.filter((el) => el !== targetTweet._id));
            } else {
                setLikes([...likes, targetTweet._id]);
            }
        } else if (eventType === 'bookmark') {
            isEventExecuted = bookmarks.includes(targetTweet._id);
            if (isEventExecuted) {
                setBookmarks(bookmarks.filter((el) => el !== targetTweet._id));
            } else {
                setBookmarks([...bookmarks, targetTweet._id]);
            }
        } else if (eventType === 'repost') {
            isEventExecuted =
                targetTweet.repostBy?.find(
                    (item) => item.nick === user.nick
                ) !== undefined;
        }
        setTweets((prevTweets) =>
            prevTweets.map((tweet: TweetType) => {
                let reposters = targetTweet.repostBy;
                if (tweet._id === targetTweet._id && eventType === 'repost') {
                    if (isEventExecuted) {
                        reposters = reposters?.filter(
                            (item) => item.nick !== user.nick
                        );
                    } else {
                        reposters?.push({
                            nick: user.nick,
                            date: '',
                        });
                    }
                    return {
                        ...tweet,
                        reposts: tweet.reposts + (isEventExecuted ? -1 : 1),
                        repostBy: reposters,
                    };
                }
                if (tweet._id === targetTweet._id && eventType === 'bookmark') {
                    return {
                        ...tweet,
                        bookmarks: tweet.bookmarks + (isEventExecuted ? -1 : 1),
                    };
                }
                if (tweet._id === targetTweet._id && eventType === 'like') {
                    return {
                        ...tweet,
                        likes: tweet.likes + (isEventExecuted ? -1 : 1),
                    };
                }
                return tweet;
            })
        );
        const value = isEventExecuted ? -1 : 1;
        if (type === 'post-replies' || type === 'notificationTweet') {
            let temp: TweetType = targetTweet;
            if (post && post._id === targetTweet?._id) {
                temp = post;
            } else if (postParent && postParent._id === targetTweet?._id) {
                temp = postParent;
            }

            if (eventType === 'like') {
                temp.likes = temp.likes + value;
            } else if (eventType === 'bookmark') {
                temp.bookmarks = temp.bookmarks + value;
            } else if (eventType === 'repost') {
                temp.reposts = temp.reposts + value;
            }
            if (temp === postParent) {
                setPostParent(temp);
            }
        }
        await instance({
            url: `/tweet/${eventType}`,
            method: 'POST',
            data: {
                nick: nick,
                tweetId: targetTweet._id,
                mode: isEventExecuted,
                refreshToken: cookie.refreshToken,
            },
        });
    };
    const getParents = async () => {
        let parentTweets: Array<TweetType> = [];

        for (const tweet of tweets) {
            if (tweet.parentId) {
                const res = await instance({
                    url: '/tweet/getone',
                    method: 'POST',
                    data: { tweetId: tweet.parentId },
                });
                parentTweets.push(res.data.result);
            }
        }
        if (post && (type === 'post-replies' || type === 'notificationTweet')) {
            if (post.parentId) {
                const response = await instance({
                    url: '/tweet/getone',
                    method: 'POST',
                    data: { tweetId: post?.parentId },
                });
                parentTweets.push(response.data.result);
            }
        }
        setParents(parentTweets);
    };
    useEffect(() => {
        if ((type === 'home' && nick) || type !== 'home') {
            getTweets();
        }
    }, [nick, profile, post, searchKey, community, activeTab]);
    useEffect(() => {
        getParents();
        if (!postParent) {
            getParent();
        }
    }, [tweets, post]);
    useEffect(() => {
        getParent();
    }, [post, parents]);
    useEffect(() => {
        if (type === 'post-replies' && tweet) {
            setReplyTarget(tweet);
            setPost(tweet);
        }
    }, [tweet]);
    useEffect(() => {
        if (tweets && parents && likes && bookmarks) {
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        }
    }, [tweets, likes, bookmarks, parents]);

    const handleReplyMode = (
        mode: boolean,
        target: TweetType = {
            date: '',
            nick: '',
            text: '',
            imageId: '',
            _id: '',
            likes: 0,
            parentId: '',
            views: 0,
            retweets: 0,
            bookmarks: 0,
            reposts: 0,
        }
    ) => {
        setReplyMode(mode);
        setText('');
        setReplyTarget(target);
    };
    const getParent = () => {
        const parent: TweetType[] = parents.filter(
            (el) => el._id === post?.parentId
        );
        setPostParent(parent[0]);
    };
    const renderTweets = () => {
        return (
            <>
                {tweets?.map((tweet: TweetType, index) => {
                    const parentTweet: TweetType[] = parents.filter(
                        (el) => el._id === tweet.parentId
                    );

                    const repost = tweet.repost ? tweet.repost[0] : null;

                    return (
                        <Tweet
                            date={tweet.date}
                            nick={tweet.nick}
                            text={tweet.text}
                            likes={tweet.likes}
                            parentId={tweet.parentId}
                            imageId={tweet.imageId}
                            views={tweet.views}
                            retweets={tweet.retweets}
                            bookmarks={tweet.bookmarks}
                            reposts={tweet.reposts}
                            repost={repost}
                            isReposted={
                                tweet.repostBy?.find(
                                    (item) => item.nick === nick
                                ) !== undefined
                            }
                            audienceName={tweet.audienceName}
                            repostBy={tweet.repostBy}
                            _id={tweet._id}
                            isLiked={likes.includes(tweet._id)}
                            bookmark={bookmarks.includes(tweet._id)}
                            isReply={false}
                            parentTweet={parentTweet[0]}
                            onTweetLike={() => handleTweetEvent(tweet, 'like')}
                            onReplyModeUpdate={() =>
                                handleReplyMode(true, tweet)
                            }
                            onBookmarkChange={() =>
                                handleTweetEvent(tweet, 'bookmark')
                            }
                            onTweetRepost={() =>
                                handleTweetEvent(tweet, 'repost')
                            }
                            post={false}
                            key={index}
                            photoMode={false}
                            user={user}
                            profileQuery={profileQuery}
                            postQuery={postQuery}
                            closeModal={closeModal}
                        />
                    );
                })}
            </>
        );
    };
    const renderReplyView = () => {
        return (
            <>
                {replyMode && replyTarget && (
                    <>
                        <S.ReplyWrapper>
                            <S.ReplyBackground
                                onClick={() => handleReplyMode(false)}
                            />
                            <S.Reply>
                                <S.ReplyClose
                                    size="4%"
                                    onClick={() => handleReplyMode(false)}
                                />
                                <Tweet
                                    date={replyTarget?.date}
                                    nick={replyTarget?.nick}
                                    text={replyTarget?.text}
                                    _id={replyTarget?._id}
                                    imageId={replyTarget?.imageId}
                                    likes={replyTarget?.likes}
                                    parentId={replyTarget?.parentId}
                                    views={replyTarget?.views}
                                    retweets={replyTarget?.retweets}
                                    reposts={replyTarget?.reposts}
                                    repostBy={replyTarget?.repostBy}
                                    bookmarks={replyTarget?.bookmarks}
                                    parentTweet={null}
                                    isLiked={false}
                                    bookmark={false}
                                    isReply={true}
                                    post={false}
                                    photoMode={false}
                                    user={user}
                                    closeModal={closeModal}
                                />

                                <TweetCreator
                                    text={text}
                                    handleChange={handleChange}
                                    handleFile={handleFile}
                                    createTweet={createTweet}
                                    placeholder="Post your reply!"
                                    avatar={avatar}
                                    nick={nick}
                                    reply={true}
                                />
                            </S.Reply>
                        </S.ReplyWrapper>
                    </>
                )}
            </>
        );
    };
    const renderPostView = () => {
        return (
            <>
                {(type === 'post-replies' || type === 'notificationTweet') &&
                    post && (
                        <>
                            {postParent && type !== 'notificationTweet' && (
                                <Tweet
                                    date={postParent.date}
                                    nick={postParent.nick}
                                    text={postParent.text}
                                    _id={postParent._id}
                                    imageId={postParent.imageId}
                                    likes={postParent.likes}
                                    parentId={postParent.parentId}
                                    views={postParent.views}
                                    retweets={postParent.retweets}
                                    bookmarks={postParent.bookmarks}
                                    reposts={postParent.reposts}
                                    repostBy={postParent.repostBy}
                                    parentTweet={null}
                                    isLiked={likes.includes(postParent._id)}
                                    bookmark={bookmarks.includes(
                                        postParent._id
                                    )}
                                    isReply={true}
                                    onTweetLike={() =>
                                        handleTweetEvent(postParent, 'like')
                                    }
                                    onReplyModeUpdate={() =>
                                        handleReplyMode(true, postParent)
                                    }
                                    onBookmarkChange={() =>
                                        handleTweetEvent(postParent, 'bookmark')
                                    }
                                    post={true}
                                    photoMode={photoMode}
                                    user={user}
                                    postQuery={postQuery}
                                    profileQuery={profileQuery}
                                    closeModal={closeModal}
                                />
                            )}
                            <Tweet
                                date={post.date}
                                nick={post.nick}
                                text={post.text}
                                likes={post.likes}
                                parentId={post.parentId}
                                imageId={post.imageId}
                                views={post.views}
                                retweets={post.retweets}
                                bookmarks={post.bookmarks}
                                reposts={post.reposts}
                                repostBy={post.repostBy}
                                _id={post._id}
                                isLiked={likes.includes(post._id)}
                                bookmark={bookmarks.includes(post._id)}
                                isReply={false}
                                parentTweet={
                                    type === 'post-replies' ? null : postParent
                                }
                                onTweetLike={() =>
                                    handleTweetEvent(post, 'like')
                                }
                                onReplyModeUpdate={() =>
                                    handleReplyMode(true, post)
                                }
                                onBookmarkChange={() =>
                                    handleTweetEvent(post, 'bookmark')
                                }
                                post={type === 'post-replies' ? true : false}
                                photoMode={photoMode}
                                user={user}
                                postQuery={postQuery}
                                profileQuery={profileQuery}
                                closeModal={closeModal}
                            />
                        </>
                    )}
            </>
        );
    };
    const renderCreator = () => {
        return (
            <>
                {(type === 'home' || type === 'post-replies') && (
                    <TweetCreator
                        text={replyMode ? '' : text}
                        handleChange={handleChange}
                        handleFile={handleFile}
                        type="home"
                        createTweet={createTweet}
                        placeholder={
                            type === 'home'
                                ? 'What is happening?!'
                                : 'Post your reply!'
                        }
                        avatar={avatar}
                        nick={nick}
                        reply={false}
                    />
                )}
            </>
        );
    };
    if (!isLoaded || !imagesLoaded) {
        return (
            <>
                {post && <Loader />}
                {renderCreator()}
                <Loader />
            </>
        );
    }
    return (
        <>
            {renderReplyView()}
            {renderPostView()}
            {renderCreator()}
            <S.Wrapper>{renderTweets()}</S.Wrapper>
        </>
    );
};

export default Tweets;
