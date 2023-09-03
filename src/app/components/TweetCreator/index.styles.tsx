import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { BiSolidImageAdd, BiWorld } from 'react-icons/bi';
import Link from 'next/link';
import { FaRegSmile } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

export const TweetCreatorWrapper = styled.div`
    width: 100%;
    border-bottom: ${(props) => (props.reply ? '0' : '1px solid #c7c7c745')};
    padding: 15px;
    display: flex;
    position: relative;
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
    position: relative;
    z-index: 10;
    align-items: center;
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
    z-index: 99;
    line-height: 20px;
    color: #1b60a0;
    position: relative;
`;
export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    cursor: default;
    left: 0;
    position: fixed;
    z-index: 99999;
`;

export const ChooseModal = styled.div`
    position: absolute;
    background-color: black;
    box-shadow: 0px 0px 5px 3px #7c7b7b7b;
    border-radius: 10px;
    width: 300px;
    z-index: 999999999999;
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

export const AudienceWrapper = styled.div`
    display: flex;
    color: white;
    justify-content: space-between;
    margin: 5px 0;
    align-items: center;
`;

export const AudienceItem = styled.div`
    display: flex;
    align-items: center;
`;
export const CheckIcon = styled(AiOutlineCheck)`
    width: 15px;
    color: #2266e4;
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
