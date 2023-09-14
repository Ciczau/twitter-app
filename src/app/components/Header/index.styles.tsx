import styled from 'styled-components';
export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    z-index: 1;
    position: relative;
    padding: 10px 20px 25px 0;
    min-width: 70px;
    transform: translate(0);
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 767px) {
        padding: 0px 5px;
        position: fixed;
        left: 0;
        opacity: ${(props) => {
            return props.opacity;
        }};
        background-color: #050505;
        bottom: 0;
        border-top: 1px solid #3b3a3a;
        width: 100vw;
        height: auto;
        z-index: 5;
        flex-direction: row;
    }
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    align-items: flex-start;
    justify-content: space-between;
    height: 60vh;
    @media screen and (max-width: 767px) {
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: auto;
        justify-content: space-around;
    }
`;

export const HeaderElement = styled.div`
    display: flex;
    align-items: center;
    z-index: 0;

    cursor: pointer;
    border-radius: 50px;
    padding: ${(props) => (props.isLogo ? '0' : '0px 10px 0px 0px')};
    color: white;
    position: relative;
    height: auto;
    font-size: 20px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #80808034;
    }
    @media screen and (max-width: 767px) {
        padding: 0;
        display: ${(props) => props.mobileView === false && 'none'};
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

export const Avatar = styled.img`
    height: 45px;
    width: 45px;
    margin: 0 5px;
    border-radius: 50%;
    object-fit: cover;
`;
export const ToolTip = styled.div`
    position: absolute;
    z-index: 1;
    width: 200px;
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    top: -55px;
    padding: 5px 10px;
    font-weight: 400;
    box-shadow: 0px 0px 5px 3px #ffffff29;
    background: #000000;
`;
export const ProfileElement = styled.div`
    display: flex;
    color: white;
    position: relative;
    flex-direction: column;
    @media screen and (max-width: 767px) {
        display: none;
    }
`;
