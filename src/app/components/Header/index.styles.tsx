import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;

    display: flex;
    z-index: 99;
    position: relative;
    padding: 10px 20px 25px 0;
    min-width: 70px;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 767px) {
        padding: 5px 5px 35px 5px;
    }
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: space-between;
    height: 60vh;
    @media screen and (max-width: 767px) {
        align-items: center;
    }
`;

export const HeaderElement = styled.div`
    display: flex;
    align-items: center;
    z-index: 99999999;

    cursor: pointer;
    border-radius: 50px;
    padding: 0px 10px 0px 0px;
    color: white;

    height: auto;
    font-size: 20px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #80808034;
    }
    @media screen and (max-width: 767px) {
        padding: 0;
    }
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
