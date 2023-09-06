import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
    @media screen and (max-width:767px){
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    display: flex;
    width: 100%;

    justify-content: flex-start;
    align-items: center;
    padding: 6px 15px;
`;

export const Menu = styled.div`
    width: 100%;
    display: flex;
`;
export const MenuItem = styled.div`
    width: 50%;
    text-align: center;
    cursor: pointer;
    padding: 15px;
    color: ${(props) => props.active && '#2b70d6'};
    border-bottom: 1px solid #c7c7c745;
    font-weight: bold;
    transition: all 0.3s ease;
    &:hover {
        background-color: #8080804c;
    }
`;

export const UsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const User = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
`;

export const Avatar = styled.img`
    height: 45px;
    width: 45px;
    border-radius: 50%;
    object-fit: cover;
`;

export const UserDescription = styled.div`
    display: flex;
    width: 70%;
    cursor: pointer;
    color: gray;
    line-height: 20px;
    justify-content: center;
    flex-direction: column;
`;

export const UserName = styled.div`
    font-weight: 700;
    color: white;
`;
export const UserBio = styled.div`
    color: white;
`;

export const FollowButton = styled.button`
    border-radius: 50px;
    padding: 5px 15px;

    font-family: inherit;
    font-weight: bold;
    font-size: 16px;
    color: ${(props) => (props.isFollowing ? 'white' : 'black')};
    font-weight: bold;
    background-color: ${(props) => (props.isFollowing ? 'black' : 'white')};
    border: ${(props) => (props.isFollowing ? '1px solid gray' : '0')};
`;
