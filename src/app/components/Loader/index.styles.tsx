import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 9999999999;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
export const Loader = styled.div`
    border: 4px solid #033a53;
    border-top: 4px solid #1f8dd6;
    border-radius: 50%;
    width: 30px;
    margin: 20px 0;
    height: 30px;
    animation: ${spin} 1s linear infinite;
`;
