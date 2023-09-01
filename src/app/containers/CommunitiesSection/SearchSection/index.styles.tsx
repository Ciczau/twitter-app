import { BsArrowLeftShort } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 600px;
    color: white;
    max-width: 85vw;
`;
export const Header = styled.div`
    display: flex;
    padding: 5px 15px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;
export const ExploreInput = styled.input`
    width: 90%;
    outline: 0;
    border: 0;
    font-size: 15px;
    color: white;
    font-family: inherit;
    background-color: transparent;
`;
export const ExploreWrapper = styled.div`
    width: 90%;
    border-radius: 50px;
    background-color: #1d1f24;
    border: 1px solid #1d1f24;
    display: flex;

    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    &:focus-within {
        border: 1px solid #3062e0;
        background-color: black;
    }
`;

export const SearchIcon = styled(IoIosSearch)`
    width: 19px;
    color: ${(props) => (props.focus ? '#3062e0' : 'white')};
`;
export const LeftArrowIcon = styled(BsArrowLeftShort)`
    cursor: pointer;
    width: 30px;
`;
export const CommunitiesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Community = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;
export const CommunityAvatar = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 10px;
    object-fit: cover;
`;
export const CommunityContent = styled.div`
    width: 70%;
    line-height: 20px;
    div {
        color: gray;
    }
`;
