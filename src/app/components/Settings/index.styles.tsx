import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import css from 'styled-jsx/css';

export const Wrapper = styled.section`
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    top: 20vh;
    left: 0;
    z-index: 5;
    justify-content: center;
    align-items: flex-start;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
`;
export const InputWrapper = styled.div`
    width: 100%;
    display: flex;
`;
export const Background = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 10;
    background-color: #4546575a;
`;

export const SettingsWrapper = styled.form`
    width: 600px;
    max-width: 90vw;
    position: relative;
    display: flex;
    font-size: 20px;

    flex-direction: column;
    border-radius: 10px;
    z-index: 10;
    background-color: #000000;
    color: white;
`;

export const Button = styled.input`
    border-radius: 50px;
    padding: 2px 12px;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
`;

export const AvatarWrapper = styled.div`
    width: 150px;
    height: 150px;
    margin: 10px;
    border-radius: 50%;
    background: ${(props) => props.src && `url(${props.src})`};
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
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

export const CloseIcon = styled(IoMdClose)`
    cursor: pointer;
`;
