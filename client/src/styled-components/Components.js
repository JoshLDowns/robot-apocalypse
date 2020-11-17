import styled from "@emotion/styled/macro";

export const CenterDiv = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AuthenticateInput = styled("input")`
  width: 100%;
  font-size: 1.5rem;
  box-sizing: border-box;
  padding: 5px;
  border: 5px solid ${(props) => (props.error ? "#C14953" : "#4C4C47")};
  border-radius: 5px;
  margin: 10px 0;
  text-align: center;
`

export const LargeButton = styled("button")`
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  border: 5px solid #4C4C47;
  border-radius: 10px;
  background-color: #E5DCC5;
  color: #2D2D2A;
  &:hover {
    cursor: pointer;
  }
`

export const SmallButton = styled("button")`
  padding: 5px;
  font-size: 1.25rem;
  border: 5px solid #4C4C47;
  border-radius: 10px;
  background-color: #E5DCC5;
  color: #2D2D2A;
  &:hover {
    cursor: pointer;
  }
`
