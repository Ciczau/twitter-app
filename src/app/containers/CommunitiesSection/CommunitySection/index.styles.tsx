import { BsArrowLeftShort } from 'react-icons/bs';
import styled from 'styled-components';
export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
`;

export const Header = styled.div`
    display: flex;
    padding: 5px 15px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 20px;
    margin: 12px 15px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;
export const CommunityBackground = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
`;
export const CommunityContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    padding: 15px;
    background-color: #111214;
`;
export const CommunityTitle = styled.div`
    font-size: 30px;
`;
export const Button = styled.div`
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
    font-family: inherit;
    color: inherit;
    border: 1px solid #363642;
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
    color: ${(props) => (props.joined ? 'white' : 'black')};
    font-weight: bold;
    background-color: ${(props) => (props.joined ? 'black' : 'white')};
    border: ${(props) => (props.joined ? '1px solid gray' : '0')};
`;
