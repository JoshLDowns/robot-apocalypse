import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled/macro";

import { useSelector, useDispatch } from "react-redux";

import { patchGame } from "../redux/slices/gameSlice";

import {
  SmallSpinLoader,
  ClickableText,
  LargeButton,
} from "../styled-components/Components";

import Clock from "../styled-components/Clock";
import Health from "../styled-components/Health";
import Prologue from "../styled-components/Prologue";

const GameWindow = styled("div")`
  position: relative;
  width: 90vw;
  max-width: 500px;
  height: 90vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameHeader = styled("div")`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2.5px solid #29d409;
`

const GamePlay = () => {
  const dispatch = useDispatch();
  
  const [prologueOpen, setPrologueOpen] = useState(false);

  const currentRoom = useSelector((state) => state.game.currentRoom);
  const currentRoomDetail = useSelector((state) =>
    state.game.rooms.find((room) => room.roomId === currentRoom)
  );
  const status = useSelector((state) => state.game.status);
  const id = useSelector((state) => state.game.id)

  const startGame = useCallback(() => {
    dispatch(patchGame(id, "status", "active"))
    setPrologueOpen(false);
  }, [dispatch, id])

  useEffect(() => {
    if (status === "new") {
      setPrologueOpen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GameWindow>
      {prologueOpen && <Prologue handleClose={startGame} />}
      <GameHeader>
        <Clock />
        <Health />
      </GameHeader>
    </GameWindow>
  )
};

export default React.memo(GamePlay);
