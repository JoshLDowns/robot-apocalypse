import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled/macro";

import { useSelector, useDispatch } from "react-redux";

import { patchGame, getInput } from "../redux/slices/gameSlice";

import { convertMappingToString } from "../utility/converterFunctions";

import {
  GreenText,
  PurpleText,
  GameInput,
  SmallPurpleText,
} from "../styled-components/Components";

import { SmallSpinLoader } from "../styled-components/AnimatedComponents";

import Clock from "../styled-components/Clock";
import Health from "../styled-components/Health";
import Prologue from "../styled-components/Prologue";

const GameWindow = styled("div")`
  width: 90vw;
  max-width: 500px;
  height: 90vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const GameHeader = styled("div")`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-bottom: 2.5px solid #29d409;
`;

const GameSubHeader = styled("div")`
  width: 100%;
  height: 75px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.border ? "2.5px solid #29d409" : "")};
`;

const ExitStatus = styled("div")`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

const GameTextWrapper = styled("section")`
  width: 100%;
  height: fit-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const GamePlay = () => {
  const dispatch = useDispatch();

  const [prologueOpen, setPrologueOpen] = useState(false);

  const currentRoom = useSelector((state) => state.game.currentRoom);
  const currentRoomDetail = useSelector((state) =>
    state.game.rooms.find((room) => room.roomId === currentRoom)
  );
  const player = useSelector((state) => state.game.player);
  const isGameLoading = useSelector((state) => state.game.isUpdateLoading);
  const isResponseLoading = useSelector((state) => state.game.isResponseLoading);
  const status = useSelector((state) => state.game.status);
  const id = useSelector((state) => state.game.id);
  const response = useSelector((state) => state.game.response);

  const startGame = useCallback(() => {
    dispatch(patchGame(id, "status", "active"));
    setPrologueOpen(false);
  }, [dispatch, id]);

  const handleInput = (evt) => {
    evt.preventDefault();
    dispatch(getInput(evt.target.firstChild.value, currentRoomDetail, player));
    evt.target.firstChild.value = "";
  };

  useEffect(() => {
    if (status === "new") {
      setPrologueOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameWindow>
      {prologueOpen && <Prologue handleClose={startGame} />}
      <GameHeader>
        <GameSubHeader border={true}>
          <Clock />
          <Health />
        </GameSubHeader>
        <GameSubHeader border={false}>
          <GreenText>{currentRoomDetail.name}</GreenText>
          <ExitStatus>
            <SmallPurpleText>Exits:</SmallPurpleText>
            <SmallPurpleText>
              {convertMappingToString(currentRoomDetail.mapping)}
            </SmallPurpleText>
          </ExitStatus>
        </GameSubHeader>
      </GameHeader>
      {!isGameLoading && (
        <>
          <GameTextWrapper>
            {currentRoomDetail.info.map((text, index) => (
              <GreenText
                style={{
                  marginBottom:
                    index !== currentRoomDetail.info.length - 1 ? "10px" : "0px",
                }}
                key={index}
              >
                {text}
              </GreenText>
            ))}
          </GameTextWrapper>
          {isResponseLoading && <SmallSpinLoader />}
          {response.length > 0 && !isResponseLoading && (
            <GameTextWrapper>
              <PurpleText>{response}</PurpleText>
            </GameTextWrapper>
          )}
          {response.length === 0 && !isResponseLoading && (
            <GameTextWrapper>
              <PurpleText>---</PurpleText>
            </GameTextWrapper>
          )}
        </>
      )}
      {isGameLoading && <SmallSpinLoader />}
      <form style={{ width: "100%" }} onSubmit={handleInput}>
        <GameInput placeholder="What would you like to do?" autoFocus/>
      </form>
    </GameWindow>
  );
};

export default React.memo(GamePlay);
