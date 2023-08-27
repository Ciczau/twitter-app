import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';
import { FaBookmark, FaRegBookmark, FaRegComment } from 'react-icons/fa';
import { BsChat } from 'react-icons/bs';

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
`;
export const Tweet = styled(motion.div)`
    width: 100%;
    border-bottom: ${(props) => (props.isReply ? '0' : '1px solid #c7c7c745')};
    padding: 15px;
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
`;
export const Text = styled.div`
    margin: 15px 0;

    overflow: hidden;
`;
export const TweetHeader = styled.div`
    display: flex;
    align-items: ${(props) => !props.post && 'center'};
    flex-direction: ${(props) => (props.post ? 'column' : 'row')};
`;

export const TweetContent = styled.div`
    width: calc(100% - 60px);
    display: flex;
    overflow: hidden;
    line-height: 20px;
    word-break: break-all;
    overflow: hidden;
    flex-direction: column;
`;

export const User = styled.div`
    font-size: 17px;
    font-weight: bold;
`;

export const UserDate = styled.div`
    font-size: 15px;
    display: flex;
    color: gray;
    cursor: pointer;
    margin-left: ${(props) => (props.post ? '0px' : '10px')};
    p {
        color: white;
        margin-right: 3px;
    }
`;

export const IconsWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;
export const IconWrapper = styled.div`
    height: 30px;
    width: 30px;
    margin: 0 4px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
`;

export const LinkWrapper = styled(Link)`
    text-decoration: none;
    color: #3c79e9;
    &:hover {
        text-decoration: underline;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
`;

export const ImageWrapper = styled.div`
    margin: 10px 0;
`;
export const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const VerticalLine = styled.div`
    height: calc(100% - 50px);
    width: 1px;
    margin-top: 10px;
    padding-bottom: 30px;
    background-color: gray;
`;

export const Dot = styled.div`
    margin: 0 4px;
    font-weight: 700;
`;
export const ReplyingInfo = styled.div`
    color: gray;
    display: flex;
`;
export const EmptyHeartIcon = styled(AiOutlineHeart)`
    color: #585858;
    cursor: pointer;
    width: 20px;
`;

export const FullHeartIcon = styled(AiFillHeart)`
    color: #ad156e;
    cursor: pointer;
    width: 18px;
`;

export const RetweetIcon = styled(FaRegComment)`
    width: 16px;
    cursor: pointer;
    color: #585858;
`;

export const ViewsIcon = styled(ImStatsBars)`
    width: 16px;
    cursor: pointer;
    color: #585858;
`;

export const BookmarkIcon = styled(FaRegBookmark)`
    width: 13px;
    cursor: pointer;
    color: #585858;
`;
export const BookmarkIconChecked = styled(FaBookmark)`
    width: 13px;
    cursor: pointer;
    color: #2185e2;
`;
export const IconContainer = styled.div`
    color: #585858;
    display: flex;
    width: 60px;
    font-weight: bold;
    cursor: pointer;
    align-items: flex-end;
    transition: all 0.3s ease;
    &:hover {
        color: ${(props) => props.type === 'like' && '#ad156e'};
        color: ${(props) => props.type === 'retweet' && '#065b94'};
        color: ${(props) => props.type === 'view' && '#065b94'};
        color: ${(props) => props.type === 'bookmark' && '#065b94'};
    }
    &:hover ${IconWrapper} {
        background-color: ${(props) => props.type === 'like' && '#ad156e47'};
        background-color: ${(props) => props.type === 'retweet' && '#065b9445'};
        background-color: ${(props) => props.type === 'view' && '#065b9445'};
        background-color: ${(props) =>
            props.type === 'bookmark' && '#065b9445'};
    }
    &:hover ${EmptyHeartIcon} {
        color: #ad156e;
    }
    &:hover ${ViewsIcon} {
        color: #065b94;
    }
    &:hover ${RetweetIcon} {
        color: #065b94;
    }
    &:hover ${BookmarkIcon} {
        color: #065b94;
    }
`;
export const Counter = styled.div`
    color: ${(props) => props.isLiked && '#ad156e'};
    font-size: 13px;
    padding-bottom: 2px;
`;

export const RetweetsCounter = styled.div`
    font-size: 12px;
`;

export const ViewsCounter = styled.div`
    font-size: 12px;
`;

export const HorizontalLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #4d4b4b;
    margin-right: 10px;
    margin-top: 7px;
    margin-bottom: 7px;
`;
export const StatsBar = styled.div`
    display: flex;
    color: #636262;
    div {
        margin-right: 2px;
        margin-left: 2px;
    }
`;

export const WhiteColor = styled.div`
    color: white;
`;
export const IconsBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`;
