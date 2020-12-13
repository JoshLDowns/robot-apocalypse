import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled/macro";

import { useSelector, useDispatch } from "react-redux";

import {
  patchGame,
  getInput,
  setInventoryOpen,
  setLogOpen,
  setHelpOpen,
} from "../redux/slices/gameSlice";

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

const GameFooter = styled("section")`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: "center";
`;

const OptionButtonBar = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OptionButton = styled("button")`
  width: 33.3333%;
  font-size: 1rem;
  font-family: "syne mono";
  background-color: black;
  box-sizing: border-box;
  color: ${(props) => (props.clicked ? "#d4098f" : "#29d409")};
  border: 2px solid #d4098f;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
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
  const isResponseLoading = useSelector(
    (state) => state.game.isResponseLoading
  );
  const status = useSelector((state) => state.game.status);
  const id = useSelector((state) => state.game.id);
  const response = useSelector((state) => state.game.response);
  const isInventoryOpen = useSelector((state) => state.game.isInventoryOpen);
  const isLogOpen = useSelector((state) => state.game.isLogOpen);
  const isHelpOpen = useSelector((state) => state.game.isHelpOpen);

  const startGame = useCallback(() => {
    dispatch(patchGame(id, "status", "active"));
    setPrologueOpen(false);
  }, [dispatch, id]);

  const handleInput = (evt) => {
    evt.preventDefault();
    dispatch(getInput(evt.target.firstChild.value, currentRoomDetail, player));
    evt.target.firstChild.value = "";
  };

  const handleOption = (evt) => {
    console.log(evt.target.id);
    if (evt.target.id === "btn-inv") {
      dispatch(setInventoryOpen());
    }
    if (evt.target.id === "btn-log") {
      dispatch(setLogOpen());
    }
    if (evt.target.id === "btn-help") {
      dispatch(setHelpOpen());
    }
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
                    index !== currentRoomDetail.info.length - 1
                      ? "10px"
                      : "0px",
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
      <GameFooter>
        <OptionButtonBar>
          <OptionButton
            id="btn-inv"
            clicked={isInventoryOpen}
            onClick={handleOption}
          >
            INVENTORY
          </OptionButton>
          <OptionButton id="btn-log" clicked={isLogOpen} onClick={handleOption}>
            LOG
          </OptionButton>
          <OptionButton
            id="btn-help"
            clicked={isHelpOpen}
            onClick={handleOption}
          >
            HELP
          </OptionButton>
        </OptionButtonBar>
        <form style={{ width: "100%" }} onSubmit={handleInput}>
          <GameInput placeholder="What would you like to do?" autoFocus />
        </form>
      </GameFooter>
    </GameWindow>
  );
};

export default React.memo(GamePlay);
