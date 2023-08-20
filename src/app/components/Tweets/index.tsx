import { useEffect, useState } from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';
import { FaRegSmile } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

import Tweet, { TweetType } from 'components/Tweet';

import * as S from './index.styles';

const TweetCreate = ({
    text,
    handleChange,
    createTweet,
    placeholder,
    avatar,
    handleFile,
}) => {
    const [image, setImage] = useState<string>('');
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <>
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <S.Image src={image} />
                        <S.DeleteImageButton
                            size="100%"
                            onClick={() => setImage('')}
                        />
                    </div>
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
                            <BiSolidImageAdd
                                size="100%"
                                color="#1b60a0"
                                style={{ width: '25px' }}
                            />
                        </label>
                        <FaRegSmile
                            size="100%"
                            color="#1b60a0"
                            style={{ width: '20px', marginLeft: '5px' }}
                        />
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
        </>
    );
};

const Tweets = ({ nick, type, avatar }) => {
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
            const res = await axios.post(
                'http://localhost:5000/tweet/create',
                formData
            );
            if (res.status === 200) {
                setTweets((prevTweets) => [res.data.newTweet, ...prevTweets]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getTweets = async () => {
        let res;
        if (type === 'home') {
            res = await axios.get('http://localhost:5000/tweet/get');
        } else {
            res = await axios.post(`http://localhost:5000/user/${type}`, {
                nick: nick,
            });
        }
        const likes = await axios.post('http://localhost:5000/tweet/likes', {
            nick: nick,
        });
        console.log(res);
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
        await axios.post('http://localhost:5000/tweet/like', {
            nick: nick,
            tweetId: tweetId,
            mode: isTweetLiked,
        });
    };

    const getParents = async () => {
        let parentTweets: Array<TweetType> = [];
        for (const tweet of tweets) {
            if (tweet.parentId) {
                const res = await axios.post(
                    'http://localhost:5000/tweet/getone',
                    { tweetId: tweet.parentId }
                );
                parentTweets.push(res.data.result);
            }
        }
        setParents(parentTweets);
    };
    useEffect(() => {
        getTweets();
    }, [nick]);
    useEffect(() => {
        getParents();
    }, [tweets]);
    const handleReplyMode = (mode: boolean, target: string) => {
        setReplyMode(mode);
        const targetTweet = tweets.filter((el) => el._id === target);
        console.log(targetTweet);
        setReplyTarget(targetTweet[0]);
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
                            <IoMdClose
                                color="white"
                                size="4%"
                                style={{ marginBottom: '15px' }}
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
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px',
                                }}
                            >
                                <TweetCreate
                                    text={text}
                                    handleChange={handleChange}
                                    handleFile={handleFile}
                                    createTweet={createTweet}
                                    placeholder="Post your reply!"
                                    avatar={avatar}
                                />
                            </div>
                        </S.Reply>
                    </S.ReplyWrapper>
                </>
            )}
            {type === 'home' && (
                <S.TweetCreatorWrapper>
                    <TweetCreate
                        text={text}
                        handleChange={handleChange}
                        handleFile={handleFile}
                        createTweet={createTweet}
                        placeholder="What is happening?!"
                        avatar={avatar}
                    />
                </S.TweetCreatorWrapper>
            )}
            {tweets.map((tweet: TweetType, index) => {
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
                        key={index}
                    />
                );
            })}
        </>
    );
};

export default Tweets;
