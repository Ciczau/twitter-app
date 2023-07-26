import Header from './Header';
import styled, { createGlobalStyle } from 'styled-components';
import { Mukta } from 'next/font/google';

const font = Mukta({
    weight: '400',
    subsets: ['latin'],
});

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: black;
`;

const MainWrapper = styled.section`
    height: auto;
    width: 600px;
    max-width: 80vw;
    border-left: 1px solid #c7c7c745;
    border-right: 1px solid #c7c7c745;
`;

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            width: 0;
        }
    }
`;
export default function BodyContent({ child }) {
    return (
        <div className={font.className}>
            <GlobalStyle />

            <Wrapper>
                <Header />
                <MainWrapper>{child}</MainWrapper>
            </Wrapper>
        </div>
    );
}
