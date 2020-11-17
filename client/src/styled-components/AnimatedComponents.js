import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react/macro";

const spin = keyframes`
  0% { 
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
`;

export const SmallSpinLoader = styled("div")`
  border: 7px solid #4c4c47;
  border-top: 7px solid #c14953;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 2s linear infinite;
`;
