import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    color: white;
    flex-direction: column;
`;

export const Head = styled.div`
    font-size: 25px;
    padding: 15px;
`;
export const SelectionWrapper = styled.div`
    border-bottom: 1px solid #c7c7c745;
    display: flex;
`;

export const Button = styled.button`
    font-family: inherit;
    width: 50%;
    padding: 15px;
    display: flex;
    font-weight: bold;
    outline: 0;
    color: ${(props) => (props.active ? '#0b70aa' : 'white')};
    cursor: pointer;
    font-size: 18px;

    background-color: transparent;
    border: 0;
    transition: all 0.3s ease;
    justify-content: center;
    &:hover {
        background-color: #aaaaaa36;
    }
`;
