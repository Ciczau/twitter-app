import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
`;
export const Header = styled.div`
    display: flex;
    padding: 5px 15px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 20px;
    margin: 12px 15px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const CommunityIconsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;
export const SearchIcon = styled(IoIosSearch)`
    width: 20px;
    cursor: pointer;
    margin: 0 5px;
`;

export const CreatorIcon = styled(AiOutlineUsergroupAdd)`
    width: 20px;
    cursor: pointer;
    margin: 0 5px;
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

export const CommunityBackgroundWrapper = styled.div`
    width: 100%;
    margin: 10px 10%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.src && `url(${props.src})`};
    background-position: center;
    background-size: cover;
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
    transition: all 0.3s ease;
    &:hover {
        background-color: #68686873;
    }
`;

export const CommunitiesWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 15px;
    flex-wrap: wrap;
`;
export const Community = styled.div`
    display: flex;
    align-items: flex-end;
    height: 80px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 3px #69696965;
    width: 120px;
    background: ${(props) => props.src && `url(${props.src})`};
    background-position: center;
    background-size: cover;
`;
export const CommunityName = styled.div`
    width: 100%;
    text-align: center;
    border-radius: 0 0 8px 8px;
    background-color: #141416;
`;
