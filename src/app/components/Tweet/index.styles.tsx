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

    display: flex;
    justify-content: space-between;
`;

export const TweetHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const TweetContent = styled.div`
    width: calc(100% - 60px);
    display: flex;
    word-break: break-all;
    flex-direction: column;
`;

export const User = styled.div`
    font-size: 17px;
    font-weight: bold;
`;

export const UserDate = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    color: gray;
    cursor: pointer;
    margin-left: 10px;
`;

export const IconsWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export const IconWrapper = styled.div`
    color: #585858;
    display: flex;
    width: 15%;
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
    margin-top: 10px;
    height: 100%;
    border-radius: 15px;
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
    width: 25px;
`;

export const FullHeartIcon = styled(AiFillHeart)`
    color: #8d0225;
    width: 25px;
`;

export const RetweetIcon = styled(HiOutlineChat)`
    width: 25px;
    color: #585858;
`;

export const ViewsIcon = styled(ImStatsBars)`
    width: 25px;
    color: #585858;
`;

export const LikeCounter = styled.div`
    color: #8d0225;
`;
