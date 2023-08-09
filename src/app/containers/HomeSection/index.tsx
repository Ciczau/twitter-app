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
import Tweet, { TweetType } from 'components/Tweet';
import Tweets from 'components/Tweets';

const HomeSection = ({ email }) => {
    const [choice, setChoice] = useState<number>(0);
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
            <Tweets email={email} type="home" />
        </S.Wrapper>
    );
};

export default HomeSection;
