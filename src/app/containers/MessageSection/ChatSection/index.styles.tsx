import { AiOutlineSend } from 'react-icons/ai';
import { BiSolidImageAdd } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaRegSmile } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    max-width: 85vw;
    height: 100vh;
    justify-content: space-between;
    @media screen and (max-width:767px){
        width: 100vw;
        max-width: 100vw;
        border: 0;    
        position    :fixed ;
    }
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.div`
    width: 100%;
    padding: 10px;
`;
export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;

export const UserWrapper = styled.div`
    padding: 10px;
    width: 95%;

    background-color: #000000;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    align-items: center;
    border-bottom: 1px solid #2c2c2c;
    transition: all 0.3s ease;
    &:hover {
        background-color: #4b4b4b37;
    }
`;

export const InputContainer = styled.div`
    border-top: 1px solid #2c2c2c;
    width: 100%;
    display: flex;
    padding: 15px;
    justify-content: center;
    background-color: black;
    @media screen and (max-width: 767px){
        position: fixed;
        bottom: 0;
    }
`;
export const InputWrapper = styled.div`
    border-radius: 15px;
    padding: 8px;
    width: 100%;
    background-color: #5251516f;
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
    }
`;

export const Input = styled.input`
    width: 90%;
    background-color: transparent;
    outline: 0;
    border: 0;
    padding: 0 10px;
    font-size: 17px;
    color: white;
    font-family: inherit;
`;

export const SendButton = styled(AiOutlineSend)`
    width: 25px;
    cursor: pointer;
    color: #045291;
`;

export const ChatWindowWrapper = styled.div`
    height: auto;
    width: 100%;
   position :relative ;
    padding: 5px 15px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    @media screen and (max-width:767px){
        margin-bottom: 160px;
    }
`;

export const SenderMessageWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

export const ReceiverMessageWrapper = styled(SenderMessageWrapper)`
    justify-content: flex-start;
`;
export const SenderMessage = styled.div`
    background-color: #0463b1;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 15px;
`;
export const ReceiverMessage = styled(SenderMessage)`
    background-color: gray;
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

export const Image = styled.img`
    width: 100%;
    max-width: 300px;
    object-fit: cover;
    margin: 5px 0;
    border-radius: 10px;
`;

export const ModalImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    z-index: 999999999;
`;
export const InputImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const ImageContainer = styled.div`
    display: flex;

    justify-content: flex-start;
    max-width: 200px;
`;
export const ImageWrapper = styled.div`
    display: flex;
    margin: 5px;
    justify-content: flex-end;
`;
export const DeleteImageButton = styled(IoMdClose)`
    position: absolute;
    margin-top: 10px;
    margin-right: 10px;
    color: #000000;
    width: 30px;
    padding: 5px;
    height: 30px;
    cursor: pointer;
    background-color: #adadad;
    transition: all 0.3s ease;
    border-radius: 50%;
    &:hover {
        background-color: #ffffff;
    }
`;

export const CloseModalIcon = styled(DeleteImageButton)`
    top: 15px;
    left: 15px;
    background-color: transparent;
    z-index: 999999999;
    &:hover {
        background-color: #686666;
    }
`;
