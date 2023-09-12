import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

export const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: fixed;
    color: white;
    backdrop-filter: blur(5px);
`;

export const FormWindow = styled.div`
    width: 600px;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 20px;

    position: relative;
    color: inherit;
    border-radius: 15px;
    background-color: black;
    @media screen and (max-width: 767px) {
        height: 100%;
    }
`;

export const Input = styled.input`
    border: ${(props) =>
        props.valid ? '1px solid #9999994c' : '1px solid red'};
    background-color: transparent;
    font-size: 20px;
    font-family: inherit;
    width: 60%;
    color: inherit;
    margin: 15px;
    padding: 15px;
    border-radius: 5px;
    outline: 0;
    &:focus {
        border-width: 2px;
    }
`;

export const SubmitButton = styled.input`
    font-family: inherit;
    margin: 25px;
    padding: 5px 15px;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.3s ease;
    background-color: white;
    color: black;
    border-radius: 15px;
    border: 0;
    opacity: ${(props) => props.disabled && '0.5'};
`;
export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    p {
        font-size: 25px;
    }
    @media screen and (max-width: 767px) {
        margin-top: 60px;
    }
`;
export const FormLabel = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    div {
        line-height: 0px;
        color: #c90404;
        font-weight: 400;
        font-size: 11px;
    }
`;
export const BottomTextWrapper = styled.div`
    color: white;
    display: ${(props) => (props.success ? 'none' : 'flex')};
    font-size: 20px;
    width: 100%;
    justify-content: center;
    cursor: pointer;

    button {
        margin-left: 5px;
        color: #128dd4;
        background-color: transparent;
        outline: 0;
        border: 0;
        font-family: inherit;
        font-size: 20px;
        cursor: pointer;
    }
`;
export const CloseIcon = styled(AiOutlineClose)`
    cursor: pointer;
`;
