import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
    @media screen and (max-width: 767px) {
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    line-height: 20px;
    padding: 5px 15px;
`;

export const Title = styled.div`
    font-size: 20px;
`;

export const UserNick = styled.div`
    color: gray;
    font-size: 15px;
`;

export const WarningWrapper = styled.div`
    width: 100%;
    padding: 10% 20%;
    text-align: center;
    p {
        font-size: 30px;
        font-weight: 700;
    }
    font-size: 15px;
`;
