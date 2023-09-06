import { BsArrowLeftShort } from 'react-icons/bs';
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
    height: 130px;
    width: 100%;
    padding: 15px;
    background-color: #111214;
`;
export const CommunityTitle = styled.div`
    font-size: 30px;
`;
export const CommunityBar = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;
export const MembersCount = styled.div``;
export const Button = styled.div`
    border-radius: 50px;
    padding: 5px 15px;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    display: flex;
    justify-content: center;
    min-width: ${(props) => (props.joined ? '80px' : '50px')};
    font-size: 16px;
    background-color: ${(props) =>
        props.leave ? '#ffffff' : props.joined ? '#111214' : 'white'};
    color: ${(props) => (!props.leave && props.joined ? 'white' : '#111214')};
    font-weight: 700;
    border: 1px solid gray;
    &:hover {
        background-color: ${(props) =>
            !props.joined && !props.leave && 'transparent'};
        color: ${(props) => !props.joined && 'white'};
    }
`;
