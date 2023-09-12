import styled, { createGlobalStyle } from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;
    justify-content: center;
    background-color: black;
`;

export const MainWrapper = styled.section`
    height: auto;
    position: relative;
    z-index: 1;
    max-width: 85vw;
    overflow-y: scroll;
    border-left: 1px solid #c7c7c745;
    border-right: 1px solid #c7c7c745;
    @media screen and (max-width: 767px) {
        max-width: 100vw;
        width: 100vw;
        border: 0;
    }
`;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        &::-webkit-scrollbar{
            width: 0;
        }

    }
`;
