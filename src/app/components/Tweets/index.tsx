import { useEffect, useState } from 'react';

import Tweet, { TweetType } from 'components/Tweet';
import instance from 'api/instance';

import * as S from './index.styles';

const TweetCreate = ({
    text,
    handleChange,
    createTweet,
    placeholder,
    avatar,
    handleFile,
    reply,
}) => {
    const [image, setImage] = useState<string>('');
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <S.TweetCreatorWrapper reply={reply}>
            <S.Avatar src={avatar} />
            <S.TweetCreator>
                <S.Input
                    minRows={1}
                    maxRows={5}
                    maxLength={255}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={text}
                />
                {image !== '' && (
                    <S.ImageWrapper>
                        <S.Image src={image} />
                        <S.DeleteImageButton
                            size="100%"
                            onClick={() => setImage('')}
                        />
                    </S.ImageWrapper>
                )}
                <S.SubmitBar>
                    <div>
                        <input
                            type="file"
                            hidden
                            id="imageInput"
                            accept="image/*"
                            onChange={(e) => {
                                handleFile(e);
                                handleImage(e);
                            }}
                        />
                        <label htmlFor="imageInput">
                            <S.AddImageIcon size="100%" />
                        </label>
                        <S.EmojiListIcon size="100%" />
                    </div>
                    <S.SendButton
                        onClick={async () => {
                            createTweet();
                            setImage('');
                        }}
                    >
                        Tweet
                    </S.SendButton>
                </S.SubmitBar>
            </S.TweetCreator>
        </S.TweetCreatorWrapper>
    );
};

const Tweets = ({
    nick,
    profile,
    type,
    avatar,
    tweet,
    photoMode,
    user,
    postQuery = '',
    profileQuery = '',
    listQuery = '',
    searchKey = '',
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
    const [replyTarget, setReplyTarget] = useState<TweetType>({
        date: '',
        nick: '',
        text: '',
        imageId: '',
        _id: '',
        likes: 0,
        parentId: '',
        views: 0,
        reposts: 0,
        retweets: 0,
        bookmarks: 0,
    });
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const createTweet = async () => {
        setText('');
        setFile('');
        try {
            let parentId: string = replyTarget?._id;
            if (replyMode === false && post) {
                parentId = post._id;
            }
            const formData = new FormData();
            formData.append('nick', nick);
            formData.append('text', text);
            formData.append('parentId', parentId);
            formData.append('file', file);

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
                if (type !== 'notificationTweet') {
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
                            if (tweet._id === replyTarget._id) {
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
        } catch (err) {
            console.log(err);
        }
    };

    const getTweets = async () => {
        try {
            let res;

            if (type === 'home') {
                res = await instance({ url: '/tweet/get', method: 'GET' });
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
                    data: { tweetId: tweet._id },
                });
            } else if (type === 'list') {
                res = await instance({
                    url: `/list/get/tweets`,
                    method: 'POST',
                    data: { listId: listQuery },
                });
            } else {
                res = await instance({
                    url: `/user/${type}`,
                    method: 'POST',
                    data: { nick: profile },
                });
                console.log(res);
            }

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
            if (
                bookmarks.data.result.length === 0 ||
                res.data.result.length === 0
            ) {
                isEmpty(true);
            } else {
                isEmpty(false);
            }
            console.log(likes);
            setBookmarks(bookmarks.data.result);
            setLikes(likes.data.result);
            if (type !== 'notificationTweet') {
                setTweets(res.data.result);
            }
            if (type === 'notificationTweet' && !post) {
                setPost(res.data.result);
                setReplyTarget(res.data.result);
            }
        } catch (err) {}
    };

    const handleTweetLike = async (tweetId: string) => {
        const isTweetLiked = likes.includes(tweetId);
        if (isTweetLiked) {
            setLikes(likes.filter((el) => el !== tweetId));
        } else {
            setLikes([...likes, tweetId]);
        }
        setTweets((prevTweets) =>
            prevTweets.map((tweet) => {
                if (tweet._id === tweetId) {
                    return {
                        ...tweet,
                        likes: tweet.likes + (isTweetLiked ? -1 : 1),
                    };
                }
                return tweet;
            })
        );
        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            post &&
            post._id === tweetId
        ) {
            let temp: TweetType = post;
            temp.likes = temp.likes + (isTweetLiked ? -1 : 1);
        }
        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            postParent &&
            postParent._id === tweetId
        ) {
            let temp: TweetType = postParent;
            temp.likes = temp.likes + (isTweetLiked ? -1 : 1);
            setPostParent(temp);
        }
        await instance({
            url: '/tweet/like',
            method: 'POST',
            data: { nick: nick, tweetId: tweetId, mode: isTweetLiked },
        });
    };
    const handleRepost = async (tweet: TweetType) => {
        const isReposted =
            tweet.repostBy?.find((item) => item.nick === user.nick) !==
            undefined;
        setTweets((prevTweets) =>
            prevTweets.map((item: TweetType) => {
                const date = new Date();
                let reposters = item.repostBy;

                if (item._id === tweet._id) {
                    if (isReposted) {
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
                        ...item,
                        reposts: item.reposts + (isReposted ? -1 : 1),
                        repostBy: reposters,
                    };
                }
                return item;
            })
        );

        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            post &&
            post._id === tweet._id
        ) {
            let temp: TweetType = post;
            temp.reposts = temp.reposts + (isReposted ? -1 : 1);
        }
        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            postParent &&
            postParent._id === tweet._id
        ) {
            let temp: TweetType = postParent;
            temp.reposts = temp.reposts + (isReposted ? -1 : 1);
            setPostParent(temp);
        }
        try {
            const res = await instance({
                url: '/tweet/repost',
                method: 'POST',
                data: {
                    tweetId: tweet._id,
                    repostBy: nick,
                    isReposted: isReposted,
                },
            });
        } catch (err) {}
    };
    const handleBookmark = async (tweetId: string) => {
        const isBookmark = bookmarks.includes(tweetId);
        if (isBookmark) {
            setBookmarks(bookmarks.filter((el) => el !== tweetId));
        } else {
            setBookmarks([...bookmarks, tweetId]);
        }
        setTweets((prevTweets) =>
            prevTweets.map((tweet) => {
                if (tweet._id === tweetId) {
                    return {
                        ...tweet,
                        bookmarks: tweet.bookmarks + (isBookmark ? -1 : 1),
                    };
                }
                return tweet;
            })
        );
        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            post &&
            post._id === tweetId
        ) {
            let temp: TweetType = post;
            temp.bookmarks = temp.bookmarks + (isBookmark ? -1 : 1);
        }
        if (
            (type === 'post-replies' || type === 'notificationTweet') &&
            postParent &&
            postParent._id === tweetId
        ) {
            let temp: TweetType = postParent;
            temp.bookmarks = temp.bookmarks + (isBookmark ? -1 : 1);
            setPostParent(temp);
        }
        await instance({
            url: '/tweet/bookmark',
            method: 'POST',
            data: { nick: nick, tweetId: tweetId, mode: isBookmark },
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
        console.log(parentTweets);
        setParents(parentTweets);
    };
    useEffect(() => {
        getTweets();
    }, [nick, profile, post, searchKey]);
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
        if (type === 'post-replies') {
            setReplyTarget(tweet);
            setPost(tweet);
        }
    }, [tweet]);

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

    return (
        <>
            {replyMode && (
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
                                repostBy={replyTarget.repostBy}
                                bookmarks={replyTarget.bookmarks}
                                parentTweet={null}
                                isLiked={false}
                                bookmark={false}
                                isReply={true}
                                post={false}
                                photoMode={false}
                                user={user}
                                closeModal={closeModal}
                            />

                            <TweetCreate
                                text={text}
                                handleChange={handleChange}
                                handleFile={handleFile}
                                createTweet={createTweet}
                                placeholder="Post your reply!"
                                avatar={avatar}
                                reply={true}
                            />
                        </S.Reply>
                    </S.ReplyWrapper>
                </>
            )}
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
                                bookmark={bookmarks.includes(postParent._id)}
                                isReply={true}
                                onTweetLike={() =>
                                    handleTweetLike(postParent._id)
                                }
                                onReplyModeUpdate={() =>
                                    handleReplyMode(true, postParent)
                                }
                                onBookmarkChange={() =>
                                    handleBookmark(postParent._id)
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
                            onTweetLike={() => handleTweetLike(post._id)}
                            onReplyModeUpdate={() =>
                                handleReplyMode(true, post)
                            }
                            onBookmarkChange={() => handleBookmark(post._id)}
                            post={type === 'post-replies' ? true : false}
                            photoMode={photoMode}
                            user={user}
                            postQuery={postQuery}
                            profileQuery={profileQuery}
                            closeModal={closeModal}
                        />
                    </>
                )}
            {(type === 'home' || type === 'post-replies') && (
                <TweetCreate
                    text={replyMode ? '' : text}
                    handleChange={handleChange}
                    handleFile={handleFile}
                    createTweet={createTweet}
                    placeholder={
                        type === 'home'
                            ? 'What is happening?!'
                            : 'Post your reply!'
                    }
                    avatar={avatar}
                    reply={false}
                />
            )}

            {tweets?.map((tweet: TweetType, index) => {
                const parentTweet: TweetType[] = parents.filter(
                    (el) => el._id === tweet.parentId
                );

                const repost = tweet.repost ? tweet.repost[0] : null;
                console.log(tweet.text);
                console.log(tweet.repostBy);
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
                        repostBy={tweet.repostBy}
                        _id={tweet._id}
                        isLiked={likes.includes(tweet._id)}
                        bookmark={bookmarks.includes(tweet._id)}
                        isReply={false}
                        parentTweet={parentTweet[0]}
                        onTweetLike={() => handleTweetLike(tweet._id)}
                        onReplyModeUpdate={() => handleReplyMode(true, tweet)}
                        onBookmarkChange={() => handleBookmark(tweet._id)}
                        onTweetRepost={() => handleRepost(tweet)}
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

export default Tweets;
