import styled from 'styled-components';
import { motion } from 'framer-motion';
export const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    position: fixed;
    color: white;
    backdrop-filter: blur(5px);
`;

export const FormWindow = styled.div`
    width: 600px;
    max-width: 100vw;
    height: auto;
    display: flex;

    flex-direction: column;
    padding: 20px;
    color: inherit;
    border-radius: 15px;
    background-color: black;
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
`;

export const SubmitButton = styled.button`
    font-family: inherit;
    margin: 25px;
    padding: 5px 15px;
    font-size: 20px;
    transition: all 0.3s ease;
    background-color: ${(props) => props.success && 'transparent'};
    color: ${(props) => props.success && 'white'};

    border-radius: 15px;
    border: 0;
`;
export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-size: 25px;
    }
`;
export const BottomTextWrapper = styled.div`
    color: white;
    display: flex;
    font-size: 20px;
    cursor: pointer;
    button {
        margin-left: 5px;
        color: #128dd4;
        background-color: transparent;
        outline: 0;
        border: 0;
        font-family: inherit;
        font-size: 20px;
    }
`;
