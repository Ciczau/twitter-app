import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
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
    width: 80%;
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
export const SelectionWrapper = styled.div`
    border-bottom: 1px solid #c7c7c745;

    margin-top: 5px;
    width: 100%;
    display: flex;
`;

export const Button = styled.button`
    font-family: inherit;
    width: 50%;
    padding: 15px;
    display: flex;
    outline: 0;
    color: ${(props) => (props.active ? '#0b70aa' : 'white')};
    cursor: pointer;
    font-size: 17px;

    background-color: transparent;
    border: 0;
    transition: all 0.3s ease;
    justify-content: center;
    &:hover {
        background-color: #4d4d4d36;
    }
`;
export const Warning = styled.div`
    width: 100%;
    padding: 10% 20%;
    font-size: 40px;
`;
