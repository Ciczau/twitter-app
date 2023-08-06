import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { BiSolidImageAdd } from 'react-icons/bi';
import { parse } from 'cookie';
import { useRouter } from 'next/router';
import { FaRegSmile } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';

import axios from 'axios';
import Link from 'next/link';

interface Tweet {
    date: string;
    email: string;
    text: string;
    _id: string;
    likes: number;
    parentId: string;
    views: number;
    retweets: number;
}

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

const HomeSection = ({ email }) => {
    const [choice, setChoice] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [likes, setLikes] = useState<Array<string>>([]);
    const [replyMode, setReplyMode] = useState<boolean>(false);
    const [replyTarget, setReplyTarget] = useState<Tweet>();
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
        const res = await axios.get('http://localhost:5000/tweet/get');
        const likes = await axios.post('http://localhost:5000/tweet/likes', {
            email: email,
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
                            <S.Tweet style={{ border: '0', padding: '0 15px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <S.Avatar src="/p2.2.jpeg" />
                                    <div
                                        style={{
                                            height: 'calc(100% - 50px)',
                                            width: '1px',
                                            marginTop: '10px',
                                            paddingBottom: '30px',
                                            backgroundColor: 'gray',
                                        }}
                                    ></div>
                                </div>
                                <S.TweetContent>
                                    <S.TweetHeader>
                                        <S.User>{replyTarget?.email} </S.User>
                                        <S.Date>{replyTarget?.date}</S.Date>
                                    </S.TweetHeader>
                                    <div>{replyTarget?.text}</div>
                                </S.TweetContent>
                            </S.Tweet>
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
            <S.Wrapper>
                <S.Head>Home</S.Head>
                <S.SelectionWrapper>
                    <S.Button
                        onClick={() => setChoice(0)}
                        active={choice === 0 ? true : false}
                    >
                        For you
                    </S.Button>
                    <S.Button
                        onClick={() => setChoice(1)}
                        active={choice === 1 ? true : false}
                    >
                        Following
                    </S.Button>
                </S.SelectionWrapper>
                <S.TweetCreatorWrapper>
                    <TweetCreate
                        handleChange={handleChange}
                        createTweet={createTweet}
                        placeholder="What is happening?!"
                    />
                </S.TweetCreatorWrapper>

                {tweets.map((tweet, index) => {
                    const dateObject = new Date(tweet.date);

                    const year = dateObject.getFullYear();
                    const month = dateObject.getMonth() + 1;
                    const day = dateObject.getDate();

                    const isLiked = likes.includes(tweet._id);
                    const parentTweet = tweets.filter(
                        (el) => el._id === tweet.parentId
                    );
                    return (
                        <S.Tweet key={index}>
                            <S.Avatar src="/p2.2.jpeg" />
                            <S.TweetContent>
                                <S.TweetHeader>
                                    <S.User>{tweet.email} </S.User>
                                    <S.Date>
                                        {day}.{month}.{year}
                                    </S.Date>
                                </S.TweetHeader>

                                {tweet.parentId && (
                                    <div
                                        style={{
                                            color: 'gray',
                                            display: 'flex',
                                        }}
                                    >
                                        Replying to&nbsp;
                                        <S.LinkWrapper
                                            href={`/${parentTweet[0]?.email}`}
                                        >
                                            @{parentTweet[0]?.email}
                                        </S.LinkWrapper>
                                    </div>
                                )}
                                <div>{tweet.text}</div>
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
                                                    onClick={() =>
                                                        handleTweetLike(
                                                            tweet._id
                                                        )
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        color: '#8d0225',
                                                    }}
                                                >
                                                    {tweet.likes}
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
                                                    onClick={() =>
                                                        handleTweetLike(
                                                            tweet._id
                                                        )
                                                    }
                                                />
                                                <div>{tweet.likes}</div>
                                            </>
                                        )}
                                    </S.IconWrapper>

                                    <S.IconWrapper>
                                        <HiOutlineChat
                                            size="100%"
                                            color="#585858"
                                            style={{ width: '25px' }}
                                            onClick={() =>
                                                handleReplyMode(true, tweet._id)
                                            }
                                        />
                                        <div>{tweet.retweets}</div>
                                    </S.IconWrapper>
                                    <S.IconWrapper>
                                        <ImStatsBars
                                            size="100%"
                                            color="#585858"
                                            style={{ width: '25px' }}
                                        />
                                        <div>{tweet.views}</div>
                                    </S.IconWrapper>
                                </S.IconsWrapper>
                            </S.TweetContent>
                        </S.Tweet>
                    );
                })}
            </S.Wrapper>
        </>
    );
};

export default HomeSection;
