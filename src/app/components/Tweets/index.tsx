import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { BiSolidImageAdd } from 'react-icons/bi';
import { FaRegSmile } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Tweet, { TweetType } from 'components/Tweet';
import axios from 'axios';
const TweetCreate = ({ handleChange, createTweet, placeholder }) => {
    return (
        <>
            <S.Avatar src="/p2.2.jpeg" />
            <S.TweetCreator>
                <S.Input
                    minRows={1}
                    maxRows={5}
                    maxLength={255}
                    placeholder={placeholder}
                    onChange={handleChange}
                />

                <S.SubmitBar>
                    <div>
                        <BiSolidImageAdd
                            size="100%"
                            color="#1b60a0"
                            style={{ width: '25px' }}
                        />
                        <FaRegSmile
                            size="100%"
                            color="#1b60a0"
                            style={{ width: '20px', marginLeft: '5px' }}
                        />
                    </div>
                    <S.SendButton onClick={createTweet}>Tweet</S.SendButton>
                </S.SubmitBar>
            </S.TweetCreator>
        </>
    );
};

const Tweets = ({ email, type }) => {
    const [text, setText] = useState<string>('');
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const [likes, setLikes] = useState<Array<string>>([]);
    const [replyMode, setReplyMode] = useState<boolean>(false);
    const [replyTarget, setReplyTarget] = useState<TweetType>({
        date: '',
        email: '',
        text: '',
        _id: '',
        likes: 0,
        parentId: '',
        views: 0,
        retweets: 0,
    });
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const createTweet = async () => {
        handleReplyMode(false, '');
        try {
            const res = await axios.post('http://localhost:5000/tweet/create', {
                email: email,
                text: text,
                parentId: replyTarget?._id,
            });
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
                email: email,
            });
        }
        const likes = await axios.post('http://localhost:5000/tweet/likes', {
            email: email,
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
            email: email,
            tweetId: tweetId,
            mode: isTweetLiked,
        });
    };
    useEffect(() => {
        getTweets();
    }, [email]);
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
                                email={replyTarget?.email}
                                text={replyTarget?.text}
                                _id={replyTarget?._id}
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
                                    handleChange={handleChange}
                                    createTweet={createTweet}
                                    placeholder="Post your reply!"
                                />
                            </div>
                        </S.Reply>
                    </S.ReplyWrapper>
                </>
            )}
            {type === 'home' && (
                <S.TweetCreatorWrapper>
                    <TweetCreate
                        handleChange={handleChange}
                        createTweet={createTweet}
                        placeholder="What is happening?!"
                    />
                </S.TweetCreatorWrapper>
            )}
            {tweets.map((tweet: TweetType, index) => {
                const isLiked = likes.includes(tweet._id);
                const parentTweet = tweets.filter(
                    (el) => el._id === tweet.parentId
                );
                return (
                    <Tweet
                        date={tweet.date}
                        email={tweet.email}
                        text={tweet.text}
                        likes={tweet.likes}
                        parentId={tweet.parentId}
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
