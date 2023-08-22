import styled from 'styled-components';
import {} from 'react-icons/io';
import { BsArrowLeftShort } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export const Wrapper = styled.div`
    color: white;
`;
export const PhotoWrapper = styled.div`
    width: calc(100vw - 400px);
    height: 100vh;
    position: fixed;
    z-index: 99999999;
    top: 0;
    display: flex;
    background-color: #0000003e;
    justify-content: center;
    align-items: center;
    left: 0;
    @media screen and (max-width: 767px) {
        width: 100vw;
    }
`;

export const IconWrapper = styled.div`
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 999999999;
`;

export const CloseIcon = styled(IoMdClose)`
    width: 30px;
    color: white;
`;

export const Photo = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`;

export const Post = styled.div`
    width: ${(props) => props.isPhotoMode && '400px'};
    background-color: black;
    border-left: ${(props) => props.isPhotoMode && '1px solid #302e2e'};
    height: ${(props) => props.isPhotoMode && '100vh'};
    position: ${(props) => props.isPhotoMode && 'fixed'};
    top: 0;
    right: 0;
`;

export const Header = styled.header`
    display: flex;
    padding: 10px 15px;
    align-items: center;
`;

export const LeftArrowIcon = styled(BsArrowLeftShort)`
    width: 30px;
    cursor: pointer;
`;
export const HeaderText = styled.div`
    font-size: 20px;
    margin-left: 10px;
`;
