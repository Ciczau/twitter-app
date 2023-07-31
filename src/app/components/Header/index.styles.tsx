import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;

    display: flex;
    padding: 10px 20px 25px 0;
    flex-direction: column;
    justify-content: space-between;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60vh;
`;

export const HeaderElement = styled.div`
    display: flex;
    align-items: center;
    z-index: 9;
    cursor: pointer;
    color: white;
    height: auto;
    font-size: 20px;
`;

export const LogoutButton = styled.div`
    padding: 3px 10px;
    color: inherit;
    font-size: 12px;
    background-color: #7e7d7d;
    font-family: inherit;
    border: 0;
    border-radius: 5px;
    outline: 0;
    box-shadow: 0px 0px 5px 3px #0000001d;
`;
