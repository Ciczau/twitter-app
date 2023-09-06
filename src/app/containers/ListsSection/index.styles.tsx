import { BsArrowLeftShort, BsCardList } from 'react-icons/bs';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { MdPostAdd } from 'react-icons/md';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 600px;
    color: white;
    max-width: 85vw;
    @media screen and (max-width:767px){
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    display: flex;
    padding: 5px 15px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #474747;
`;
export const ModalHeader = styled(Header)`
    border-bottom: 0;
`;
export const Title = styled.div`
    font-size: 20px;
    margin: 12px 15px;
    display: flex;
    align-items: center;
    line-height: 18px;
    p {
        font-size: 13px;
        color: gray;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;
export const AddListIcon = styled(MdPostAdd)`
    width: 20px;
`;
export const ListsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
export const List = styled.div`
    padding: 5px 15px;
    display: flex;
`;
export const ListInfo = styled.div`
    display: flex;
    padding: 0px 10px;
    align-items: center;
    font-size: 15px;
    p {
        color: gray;
        font-size: 12px;
    }
`;
export const ListIcon = styled(BsCardList)`
    width: 30px;
`;
export const Dot = styled.div`
    margin: 0 4px;
    font-weight: 700;
`;
export const FollowButton = styled.div`
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
    font-family: inherit;
    color: inherit;
    border: 1px solid #363642;
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
    color: ${(props) => (props.isFollowing ? 'white' : 'black')};
    font-weight: bold;
    background-color: ${(props) => (props.isFollowing ? 'black' : 'white')};
    border: ${(props) => (props.isFollowing ? '1px solid gray' : '0')};
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
    border-radius: 50px;
    background-color: #1d1f24;
    border: 1px solid #1d1f24;
    display: flex;

    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    &:focus-within {
        border: 1px solid #3062e0;
        background-color: black;
    }
`;

export const SearchIcon = styled(IoIosSearch)`
    width: 19px;
    color: ${(props) => (props.focus ? '#3062e0' : 'white')};
`;
export const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 99999999;
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
    height: 600px;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 999999999;
    color: white;
    border-radius: 10px;
    background-color: black;
`;

export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 99999999;
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
export const IconWrapper = styled.label`
    background-color: #00000052;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #68686873;
    }
`;
export const InputWrapper = styled.div`
    width: 100%;
    display: flex;
`;
export const Button = styled.button`
    border-radius: 50px;
    padding: 2px 12px;
    border: 0;
    font-weight: bold;
    opacity: ${(props) => !props.active && '0.5'};
    font-family: inherit;
`;
export const Input = styled.input`
    padding: 25px 10px 10px 10px;
    margin: 0px 20px 15px 20px;
    border-radius: 5px;
    font-size: 16px;
    border: 2px solid #3d3c4453;
    width: 100%;
    background-color: transparent;
    color: white;
    font-family: inherit;
    outline: 0;
    &:focus {
        border: 2px solid #1463a3;
    }
`;
export const Label = styled.label`
    position: absolute;
    left: 30px;
    margin-top: ${(props) => (props.isEmpty ? '18px' : '2px')};
    font-size: ${(props) => (props.isEmpty ? '18px' : '15px')};
    color: ${(props) => (props.isEmpty ? '#797676' : '#1463a3')};

    transition: all 0.3s ease;
    ${Input}:focus ~ & {
        margin-top: 2px;
        font-size: 15px;
        color: #1463a3;
    }
`;
export const SelectionWrapper = styled.div`
    border-bottom: 1px solid #c7c7c745;
    display: flex;
    margin-bottom: 5px;
    width: 100%;
`;

export const TabButton = styled.button`
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
export const EmptyListInfo = styled.div`
    font-size: 35px;
    margin: 30px;
`;
export const SearchResult = styled.div`
    width: 100%;
    position: absolute;
    border-radius: 5px;
    top: 100%;
    color: gray;
    padding: 15px 0px;
    background-color: black;
    box-shadow: 0px 0px 5px 3px #4444447d;
    border: 1px solid #444444;
`;
export const ExploreWarning = styled.div`
    font-size: 16px;
    color: gray;
    width: 100%;
    text-align: center;
`;
export const ExploreContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 80%;
`;
