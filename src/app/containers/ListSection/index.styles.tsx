import { BsArrowLeftShort } from 'react-icons/bs';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 600px;
    color: white;
    max-width: 85vw;
    @media screen and (max-width:767px){
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    display: flex;
    padding: 10px 15px;
    width: 100%;
`;
export const Title = styled.div`
    font-size: 20px;
    margin: 0px 15px;
    line-height: 18px;
    p {
        font-size: 13px;
        color: gray;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;
export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;
export const ListInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #3b3b3b;
    padding: 20px;
`;
export const ListTitle = styled.div`
    font-size: 20px;
`;
export const ListDesc = styled.div`
    font-size: 17px;
`;

export const ListInfo = styled.div`
    display: flex;
    p {
        color: gray;
    }
`;

export const FollowButton = styled.div`
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
    font-family: inherit;
    color: inherit;
    border: 1px solid #363642;
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
    color: ${(props) => (props.isFollowing ? 'white' : 'black')};
    font-weight: bold;
    background-color: ${(props) => (props.isFollowing ? 'black' : 'white')};
    border: ${(props) => (props.isFollowing ? '1px solid gray' : '0')};
`;
