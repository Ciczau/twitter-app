import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChat } from 'react-icons/hi';
import { ImStatsBars } from 'react-icons/im';

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
    color: #585858;
    display: flex;
    width: 13%;
    font-weight: bold;

    cursor: pointer;
    justify-content: space-between;
    align-items: center;
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
    width: 25px;
`;

export const FullHeartIcon = styled(AiFillHeart)`
    color: #8d0225;
    cursor: pointer;
    width: 25px;
`;

export const RetweetIcon = styled(HiOutlineChat)`
    width: 25px;
    cursor: pointer;
    color: #585858;
`;

export const ViewsIcon = styled(ImStatsBars)`
    width: 25px;
    cursor: pointer;
    color: #585858;
`;

export const LikeCounter = styled.div`
    color: #8d0225;
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
