import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { BiSolidImageAdd } from 'react-icons/bi';
import { parse } from 'cookie';
import { useRouter } from 'next/router';
import { FaRegSmile } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';
import { GetStaticProps } from 'next';
import axios from 'axios';

interface Tweet {
    date: string;
    email: string;
    text: string;
    _id: string;
    likes: number;
    views: number;
    retweets: number;
}

const HomeSection = ({ email }) => {
    const [choice, setChoice] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [tweets, setTweets] = useState<Tweet[]>([]);

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const createTweet = async () => {
        console.log(text, email);
        try {
            const res = await axios.post('http://localhost:5000/tweet/create', {
                email: email,
                text: text,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const getTweets = async () => {
        const res = await axios.get('http://localhost:5000/tweet/get');
        console.log(res);
        setTweets(res.data.result);
    };

    const handleTweetLike = async (tweetId: string) => {
        try {
            const res = await axios.post('http://localhost:5000/tweet/like', {
                email: email,
                tweetId: tweetId,
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getTweets();
    }, []);
    useEffect(() => {
        console.log(tweets);
    }, [tweets]);

    return (
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
                <S.Avatar src="/p2.2.jpeg" />
                <S.TweetCreator>
                    <S.Input
                        minRows={1}
                        maxRows={5}
                        maxLength={255}
                        placeholder="What is happening?!"
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
            </S.TweetCreatorWrapper>
            {tweets.map((tweet, index) => {
                const dateObject = new Date(tweet.date);

                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                console.log(tweet);
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
                            <div>{tweet.text}</div>
                            <S.IconsWrapper>
                                <S.IconWrapper>
                                    <AiOutlineHeart
                                        size="100%"
                                        color="#585858"
                                        style={{ width: '25px' }}
                                        onClick={() =>
                                            handleTweetLike(tweet._id)
                                        }
                                    />
                                    <div>{tweet.likes}</div>
                                </S.IconWrapper>

                                <S.IconWrapper>
                                    <HiOutlineChat
                                        size="100%"
                                        color="#585858"
                                        style={{ width: '25px' }}
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
    );
};

export default HomeSection;
