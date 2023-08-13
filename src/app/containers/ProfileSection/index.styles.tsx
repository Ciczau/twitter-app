import styled from 'styled-components';
export const Wrapper = styled.div`
    color: white;
`;
export const Header = styled.div`
    display: flex;
    width: 100%;

    justify-content: flex-start;
    align-items: center;
    padding: 6px 15px;
`;
export const ProfileHeader = styled.div`
    width: 100%;

    height: 200px;
    background-color: #2b2b2e;
`;

export const Avatar = styled.img`
    max-width: 20vw;
    max-height: 20vw;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0px 15px;
    border: 4px solid black;
`;

export const SetUpProfileButton = styled.button`
    border-radius: 50px;
    padding: 5px 15px;
    margin: 50px 15px 0px 0px;
    font-family: inherit;
    color: inherit;
    border: 1px solid #363642;
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
`;

export const FollowButton = styled(SetUpProfileButton)`
    color: black;
    font-weight: bold;
    background-color: white;
`;

export const AvatarBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -75px;
    @media screen and (max-width: 800px) {
        margin-top: -10vw;
    }
`;

export const Description = styled.div`
    padding: 15px;
    color: gray;
`;

export const NavBar = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid #c7c7c745;
    justify-content: space-around;
`;

export const Button = styled.button`
    font-family: inherit;
    width: 33%;
    padding: 15px;
    display: flex;
    font-weight: bold;
    outline: 0;
    color: ${(props) => (props.active ? '#0b70aa' : 'white')};
    cursor: pointer;
    font-size: 17px;

    background-color: transparent;
    border: 0;
    transition: all 0.3s ease;
    justify-content: center;
    &:hover {
        background-color: #aaaaaa16;
    }
`;
