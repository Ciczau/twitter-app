import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
