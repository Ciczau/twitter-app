import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #141414;
    display: flex;
    z-index: 99;
    position: absolute;
    justify-content: space-evenly;
    align-items: center;
    color: white;
    flex-direction: column;
`;

export const RegisterButton = styled.button`
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 20px;
    font-family: inherit;
    color: inherit;
    border: 0;
    cursor: pointer;
    background-color: #0aa8f1;
`;

export const LoginButton = styled(RegisterButton)`
    background-color: transparent;
    border: 1px solid #0aa8f1;
`;
export const ContentWrapper = styled.div`
    text-align: center;
    height: 30vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
`;
