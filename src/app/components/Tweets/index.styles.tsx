import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { BiSolidImageAdd, BiWorld } from 'react-icons/bi';
import Link from 'next/link';
import { FaRegSmile } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
export const Wrapper = styled.div`
    display: flex;
    width: 100%;

    color: white;
    flex-direction: column;
`;

export const Head = styled.div`
    font-size: 25px;
    padding: 15px;
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
    border-bottom: ${(props) => (props.reply ? '0' : '1px solid #c7c7c745')};
    padding: 15px;
    display: flex;
    justify-content: space-between;
`;

export const TweetCreator = styled.div`
    display: flex;
    width: calc(100% - 60px);
    align-items: flex-start;
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
    margin-top: 20px;
    width: 100%;
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
export const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 15px;
`;

export const ImageWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-end;
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
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    background-color: #7b808849;
`;

export const ReplyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    top: 100px;
    z-index: 9999999999;
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
    z-index: 9999999999;
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
export const DeleteImageButton = styled(IoMdClose)`
    position: absolute;
    margin-top: 10px;
    margin-right: 10px;
    color: black;
    width: 30px;
    padding: 5px;
    height: 30px;
    cursor: pointer;
    background-color: #adadad;
    transition: all 0.3s ease;
    border-radius: 50%;
    &:hover {
        background-color: gray;
    }
`;

export const ReplyClose = styled(IoMdClose)`
    margin-bottom: 15px;
    color: white;
    cursor: pointer;
`;

export const AddImageIcon = styled(BiSolidImageAdd)`
    width: 25px;
    color: #1b60a0;
    cursor: pointer;
`;

export const EmojiListIcon = styled(FaRegSmile)`
    width: 20px;
    cursor: pointer;
    margin-left: 5px;
    color: #1b60a0;
`;

export const ChoiceName = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
`;
export const ChooseWrapper = styled.div`
    background-color: black;
    border: 1px solid #474747;
    border-radius: 50px;
    font-weight: 700;
    padding: 0px 10px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: flex-start;

    z-index: 9999999;
    line-height: 20px;
    color: #1b60a0;
    position: relative;
`;
export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    cursor: default;
    left: 0;
    position: fixed;
    z-index: 9999999;
`;

export const ChooseModal = styled.div`
    position: absolute;
    background-color: black;
    box-shadow: 0px 0px 5px 3px #7c7b7b7b;
    border-radius: 10px;
    width: 300px;
    z-index: 999999999;
    margin-top: 30px;
    padding: 10px;
`;
export const TitleModal = styled.div`
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
    div {
        margin-top: 10px;
        font-size: 17px;
    }
`;

export const ChoiceWrapper = styled.div`
    display: flex;
    position: relative;
    z-index: 999;
    color: white;
    align-items: center;
`;

export const WorldIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    background-color: #2266e4;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const WorldIcon = styled(BiWorld)`
    width: 20px;
    color: white;
`;
export const CommunityAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
    object-fit: cover;
`;
export const ModalOpenIcon = styled(MdOutlineKeyboardArrowDown)`
    width: 15px;
    cursor: pointer;
`;
