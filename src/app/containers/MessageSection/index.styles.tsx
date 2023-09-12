import styled from 'styled-components';
import { BsEnvelopePlus } from 'react-icons/bs';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
export const Wrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
`;
export const ChatListWrapper = styled.div`
    width: ${(props) => (props.openedChat ? '300px' : '600px')};
    height: 100vh;
    border-right: 1px solid #303030;
    @media screen and (max-width: 1100px) {
        width: 600px;
        max-width: 85vw;
    }
    @media screen and (max-width: 767px) {
        width: 100vw;
        max-width: 100vw;
        border: 0;
    }
`;
export const Header = styled.div`
    display: flex;
    padding: 15px;
    width: 100%;
    justify-content: space-between;
`;
export const Title = styled.div`
    font-size: 20px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const NewChatIcon = styled(BsEnvelopePlus)`
    color: white;
    width: 25px;
`;
export const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Modal = styled.div`
    max-width: 90vw;
    width: 600px;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 10;
    color: white;
    border-radius: 10px;
    background-color: black;
`;

export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #464e55e6;
`;
export const CloseIcon = styled(IoMdClose)`
    width: 25px;
    margin-right: 5px;
    color: white;
`;

export const UserWrapper = styled.div`
    display: flex;
    padding: 15px;
    width: 100%;
    justify-content: space-between;
    transition: all 0.3s ease;
    opacity: ${(props) => !props.followEachOther && '0.5'};
    &:active {
        background-color: #3a3a3a;
    }
`;

export const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin: 5px;
    border-radius: 50%;
`;

export const UserContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export const UserNick = styled.div`
    color: gray;
    line-height: 15px;
    font-size: 14px;
`;
export const ExploreInput = styled.input`
    width: 90%;
    outline: 0;
    border: 0;
    font-size: 15px;
    color: white;
    font-family: inherit;
    background-color: transparent;
`;
export const ExploreWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #c7c7c745;
`;

export const SearchIcon = styled(IoIosSearch)`
    width: 19px;
    color: ${(props) => (props.focus ? '#3062e0' : 'white')};
`;
