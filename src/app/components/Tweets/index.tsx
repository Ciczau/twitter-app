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

const Tweets = ({ nick, profile, type, avatar, postTweet }) => {
    const [post, setPost] = useState<TweetType>();

    const [text, setText] = useState<string>('');
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const [parents, setParents] = useState<TweetType[]>([]);
    const [likes, setLikes] = useState<Array<string>>([]);
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
        retweets: 0,
    });
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const createTweet = async () => {
        handleReplyMode(false, '');
        setText('');
        try {
            const formData = new FormData();
            formData.append('nick', nick);
            formData.append('text', text);
            formData.append('parentId', replyTarget?._id);
            formData.append('file', file);

            const res = await instance({
                url: '/tweet/create',
                method: 'POST',
                data: formData,
            });
            if (res.status === 200) {
                setTweets((prevTweets) => [res.data.newTweet, ...prevTweets]);
                if (replyTarget === postTweet && post) {
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
        let res;
        if (type === 'home') {
            res = await instance({ url: '/tweet/get', method: 'GET' });
        } else if (type === 'post-replies') {
            res = await instance({
                url: '/tweet/get/replies',
                method: 'POST',
                data: { tweetId: post?._id },
            });
        } else {
            res = await instance({
                url: `/user/${type}`,
                method: 'POST',
                data: { nick: profile },
            });
        }

        const likes = await instance({
            url: '/tweet/likes',
            method: 'POST',
            data: { nick: nick },
        });
        setLikes(likes.data.result);
        setTweets(res.data.result);
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
        if (type === 'post-replies' && post) {
            let temp: TweetType = post;
            temp.likes = temp.likes + (isTweetLiked ? -1 : 1);
        }
        await instance({
            url: '/tweet/like',
            method: 'POST',
            data: { nick: nick, tweetId: tweetId, mode: isTweetLiked },
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
        if (postTweet) {
            const response = await instance({
                url: '/tweet/getone',
                method: 'POST',
                data: { tweetId: postTweet.parentId },
            });
            parentTweets.push(response.data.result);
        }
        setParents(parentTweets);
    };
    useEffect(() => {
        getTweets();
    }, [nick, post]);
    useEffect(() => {
        getParents();
    }, [tweets, post]);
    useEffect(() => {
        setPost(postTweet);
        setReplyTarget(postTweet);
    }, [postTweet]);

    const handleReplyMode = (mode: boolean, target: string) => {
        setReplyMode(mode);
        if (type === 'post-replies') {
            setReplyTarget(postTweet);
        } else {
            const targetTweet = tweets.filter((el) => el._id === target);
            setReplyTarget(targetTweet[0]);
        }
    };
    return (
        <>
            {replyMode && (
                <>
                    <S.ReplyWrapper>
                        <S.ReplyBackground
                            onClick={() => handleReplyMode(false, '')}
                        />
                        <S.Reply>
                            <S.ReplyClose
                                size="4%"
                                onClick={() => handleReplyMode(false, '')}
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
                                parentTweet={null}
                                isLiked={false}
                                isReply={true}
                                onTweetLike={function (): void {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                                onReplyModeUpdate={function (): void {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                                post={false}
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
            {type === 'post-replies' && post && (
                <Tweet
                    date={post?.date}
                    nick={post?.nick}
                    text={post?.text}
                    likes={post?.likes}
                    parentId={post?.parentId}
                    imageId={post?.imageId}
                    views={post?.views}
                    retweets={post?.retweets}
                    _id={post?._id}
                    isLiked={likes.includes(post?._id)}
                    isReply={false}
                    parentTweet={parents[0]}
                    onTweetLike={() => handleTweetLike(post?._id)}
                    onReplyModeUpdate={() => handleReplyMode(true, post?._id)}
                    post={true}
                />
            )}
            {(type === 'home' || type === 'post-replies') && (
                <TweetCreate
                    text={text}
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
                const isLiked = likes.includes(tweet._id);
                const parentTweet: TweetType[] = parents.filter(
                    (el) => el._id === tweet.parentId
                );
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
                        _id={tweet._id}
                        isLiked={isLiked}
                        isReply={false}
                        parentTweet={parentTweet[0]}
                        onTweetLike={() => handleTweetLike(tweet._id)}
                        onReplyModeUpdate={() =>
                            handleReplyMode(true, tweet._id)
                        }
                        post={false}
                        key={index}
                    />
                );
            })}
        </>
    );
};

export default Tweets;
