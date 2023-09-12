import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BiLogOut } from 'react-icons/bi';

export const Wrapper = styled(motion.div)`
    width: 300px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    padding: 10px;
    z-index: 5;
    background-color: black;
    box-shadow: 0px 0px 5px 3px #7773738d;
`;
export const AvatarToggler = styled.img`
    height: 35px;
    width: 35px;
    margin-right: 10px;
    position: relative;
    z-index: 1;
    object-fit: cover;
    border-radius: 50%;
`;
export const Avatar = styled(AvatarToggler)`
    width: 45px;
    height: 45px;
    margin-left: 12px;
`;

export const ModalBackground = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    background-color: #424f637b;
    top: 0;
    z-index: 4;
`;
export const UserData = styled.div`
    color: white;
    font-size: 20px;
    margin-left: 12px;
    margin-bottom: 25px;
    line-height: 24px;
    p {
        color: gray;
        font-size: 15px;
    }
`;
export const MenuElement = styled.div`
    display: flex;
    align-items: center;
`;
export const LogoutIcon = styled(BiLogOut)`
    width: 25px;
    margin: 0px 10px;
`;

export const LogoutButton = styled.button`
    display: flex;
    margin-top: 20px;
    cursor: pointer;
    background-color: transparent;
    color: white;
    border: 0;
    outline: 0;
    align-items: center;
`;
