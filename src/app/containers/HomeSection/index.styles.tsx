import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
export const Wrapper = styled.div`
    display: flex;
    width: 600px;
    min-height: 100vh;
    max-width: 85vw;
    position: relative;
    z-index: 1;
    color: white;
    flex-direction: column;
    @media screen and (max-width: 767px) {
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    position: fixed;
    width: 600px;
    z-index: 2;
    backdrop-filter: blur(5px);
    background-color: #000000b2;
    max-width: 85vw;
    transition: all 0.01s ease;
    @media screen and (max-width: 767px) {
        width: 100vw;
        max-width: 100vw;
        position: relative;
    }
`;
export const TweetsWrapper = styled.div`
    margin-top: 130px;
    @media screen and (max-width: 767px) {
        margin-top: 0px;
    }
`;

export const Head = styled.div`
    font-size: 25px;
    padding: 15px;
    display: flex;
    align-items: center;
`;
export const SelectionWrapper = styled.div`
    border-bottom: 1px solid #c7c7c745;
    display: flex;
`;

export const Button = styled.button`
    font-family: inherit;
    width: 50%;
    padding: 15px;
    display: flex;
    font-weight: bold;
    outline: 0;
    color: ${(props) => (props.active ? '#0b70aa' : 'white')};
    cursor: pointer;
    font-size: 17px;

    background-color: transparent;
    border: 0;
    transition: all 0.3s ease;
    justify-content: center;
    &:hover {
        background-color: #aaaaaa36;
    }
`;

export const TweetCreatorWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #c7c7c745;
    padding: 15px;

    display: flex;
    justify-content: space-between;
`;

export const TweetCreator = styled.div`
    display: flex;
    width: calc(100% - 60px);
    flex-direction: column;
`;
export const Input = styled(TextareaAutosize)`
    width: 100%;
    font-family: inherit;
    max-height: 200px;
    padding: 15px 0;
    line-height: 1.4;
    color: white;
    background-color: transparent;
    font-size: 22px;
    overflow-y: auto;
    outline: 0;
    border: 0;
    box-sizing: border-box;
    display: flex;
    resize: none;
`;

export const SubmitBar = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SendButton = styled.button`
    background-color: #1b60a0;
    outline: 0;
    border: 0;
    font-size: 17px;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 25px;
    color: white;
    font-family: inherit;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
`;
export const Tweet = styled(motion.div)`
    width: 100%;
    border-bottom: 1px solid #c7c7c745;
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

export const Date = styled.div`
    font-size: 14px;
    color: gray;
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

export const ReplyBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: #7b808849;
`;

export const ReplyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    top: 100px;
    z-index: 5;
    left: 0;
    color: white;
    width: 100vw;
    height: 100vh;
    position: fixed;
`;

export const Reply = styled.div`
    background-color: black;
    border-radius: 15px;
    width: 600px;
    position: relative;
    z-index: 5;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 90vw;
`;

export const LinkWrapper = styled(Link)`
    text-decoration: none;
    color: #3c79e9;
    &:hover {
        text-decoration: underline;
    }
`;
export const TwitterIcon = styled(FaTwitter)`
    width: 25px;
`;
export const TwitterIconWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    left: 0;
    align-items: center;
    position: absolute;
`;
