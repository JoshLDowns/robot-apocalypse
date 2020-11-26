import React, { useState } from "react";
import styled from "@emotion/styled/macro";

import { useDispatch } from "react-redux";

import { startNewGame } from "../redux/slices/gameSlice";
import { patchUser } from "../redux/slices/userSlice";

import { ClickableText, LargeButton } from "./Components";

const ButtonRow = styled("div")`
  display: flex;
  flex-direction: row;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const diffMap = {
  easy: "1",
  medium: "2",
  hard: "3",
};

const NewGame = ({ name, playerId}) => {
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState("2");

  const handleDifficulty = (evt) => {
    setDifficulty(diffMap[evt.target.id]);
  };

  const handleNewGame = () => {
    dispatch(startNewGame(difficulty, name, playerId));
    dispatch(patchUser(playerId, "active_game", true))
  };

  return (
    <>
      <h3 style={{ color: "#d40929" }}>
        It's hell out there, choose wisely ...
      </h3>
      <br />
      <ButtonRow>
        <ClickableText
          id="easy"
          onClick={handleDifficulty}
          clicked={difficulty === "1"}
        >
          {"Minimal Conflict"}
        </ClickableText>
        <ClickableText
          id="medium"
          onClick={handleDifficulty}
          clicked={difficulty === "2"}
        >
          {"Standard"}
        </ClickableText>
        <ClickableText
          id="hard"
          onClick={handleDifficulty}
          clicked={difficulty === "3"}
        >
          {"Maximum Conflict"}
        </ClickableText>
      </ButtonRow>
      <br />
      <br />
      <LargeButton onClick={handleNewGame}>START GAME</LargeButton>
    </>
  );
};

export default NewGame;
