import styled from 'styled-components';
export const UsersWrapper = styled.div`
    display: flex;
    width: 100%;
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
