import styled from "@emotion/styled/macro";

export const CenterDiv = styled("div")`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const AuthenticateInput = styled("input")`
  width: 100%;
  font-size: 1.5rem;
  font-family: "syne mono";
  box-sizing: border-box;
  padding: 5px;
  border-style: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-image: none;
  border-bottom: 5px solid ${(props) => (props.error ? "#d40929" : "#29d409")};
  background-color: black;
  color: #29d409;
  margin: 10px 0;
  text-align: center;
  &:focus {
    outline: none
  }
`

export const LargeButton = styled("button")`
  padding: 10px;
  font-family: "syne mono";
  font-size: 1.5rem;
  font-weight: 600;
  border-style: none;
  border-bottom: 5px solid #29d409;
  background-color: black;
  color: #29d409;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none
  }
`

export const SmallButton = styled("button")`
  padding: 5px;
  font-size: 1.25rem;
  font-family: "syne mono";
  border-style: none;
  border-bottom: 3px solid #d4098f;
  background-color: black;
  color: #d4098f;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none
  }
`

export const OutboundLink = styled("a")`
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "syne mono";
  color: #29d409;
  margin: 30px 20px;
`

export const ClickableText = styled("p")`
  font-size: 1.5rem;
  font-family: "syne mono";
  color: ${props => props.clicked ? "#d4098f" : "#29d409"};
  margin: 30px 20px;
  &:hover {
    cursor: pointer;
  }
`

export const DisplayTextPurp = styled("p")`
  font-size: 1.25rem;
  font-family: "syne mono";
  color: #d4098f;
  margin: 0;
  padding: 0;
`

export const SmallGreenText = styled("p")`
  font-size: .75rem;
  font-family: "syne mono";
  color: #29d409;
  margin: 0;
  padding: 0;
`
export const GreenText = styled("p")`
  font-size: 1rem;
  font-family: "syne mono";
  color: #29d409;
`