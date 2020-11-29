import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";

import { useDispatch, useSelector } from "react-redux";

import {
  getUserGame,
  saveUserGame,
  clearGame,
  setPlaying,
  setPaused,
  updateTime,
} from "../redux/slices/gameSlice";
import { signout } from "../redux/slices/userSlice";

import { ClickableText, CenterDiv } from "../styled-components/Components";
import { LargeSpinLoader } from "../styled-components/AnimatedComponents";

import Landing from "./Landing";
import GamePlay from "./GamePlay";

const TopBar = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const ListOption = styled("p")`
  color: #d4098f;
  font-size: 1.25rem;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ListWrapper = styled("div")`
  position: absolute;
  top: 100px;
  right: ${(props) => (props.open ? "20px" : "-150px")};
  transition: all 0.5s ease;
  text-align: right;
`;

const OptionsMenu = ({ open, handleLogout, handleSave, playing }) => {
  const gameId = useSelector((state) => state.game.id);
  const timePlayed = useSelector((state) => state.game.timePlayed);
  const score = useSelector((state) => state.game.score);
  const player = useSelector((state) => state.game.player);
  const rooms = useSelector((state) => state.game.rooms);
  const currentRoom = useSelector((state) => state.game.currentRoom);
  return (
    <ListWrapper open={open}>
      {playing && (
        <ListOption
          onClick={() =>
            handleSave(gameId, timePlayed, score, player, rooms, currentRoom)
          }
        >
          ~ save game
        </ListOption>
      )}
      <ListOption onClick={handleLogout}>~ logout</ListOption>
    </ListWrapper>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [activeGame, setActiveGame] = useState(false);

  const user = useSelector((state) => state.user.username);
  const playerId = useSelector((state) => state.user.id);
  const active = useSelector((state) => state.user.activeGame);
  const isGameLoading = useSelector((state) => state.game.isLoading);
  const playing = useSelector((state) => state.game.playing);
  const paused = useSelector((state) => state.game.paused);
  const status = useSelector((state) => state.game.status);

  const handleOptions = () => {
    setOptionsOpen(!optionsOpen);
    dispatch(setPaused());
  };

  const handleLogout = () => {
    dispatch(clearGame());
    dispatch(signout());
  };

  const handleContinue = () => {
    dispatch(setPlaying());
    console.log("continue");
  };

  const handleSave = (id, timePlayed, score, player, rooms, currentRoom) => {
    dispatch(saveUserGame(id, timePlayed, score, player, rooms, currentRoom));
    console.log("saving");
  };

  useEffect(() => {
    if (active) {
      dispatch(getUserGame(playerId));
    }
    //eslint-disable-next-line
  }, []);

  //These two use effects handle pausing and not pausing the game
  useEffect(() => {
    if (playing && !paused && !activeGame && status && status.includes("active")) {
      const interval = setInterval(() => {
        dispatch(updateTime());
      }, 1000);
      setTimer(interval);
      setActiveGame(true);
    }
    return () => {
      console.log("clearing");
      clearInterval(timer);
    };
  }, [playing, paused, activeGame, timer, status, dispatch]);

  useEffect(() => {
    if (playing && paused && activeGame && status && status.includes("active")) {
      setActiveGame(false);
      setTimer(null);
      clearInterval(timer);
    }
  }, [playing, paused, timer, activeGame, status]);

  if (isGameLoading) {
    return (
      <CenterDiv>
        <LargeSpinLoader />
      </CenterDiv>
    );
  }

  return (
    <>
      <TopBar>
        <ClickableText clicked={optionsOpen} onClick={handleOptions}>
          options/
        </ClickableText>
      </TopBar>
      <CenterDiv>
        <OptionsMenu
          open={optionsOpen}
          handleLogout={handleLogout}
          handleSave={handleSave}
          playing={playing}
        />
        {!playing && (
          <Landing
            active={active}
            user={user}
            playerId={playerId}
            handleContinue={handleContinue}
          />
        )}
        {playing && <GamePlay />}
      </CenterDiv>
    </>
  );
};

export default Dashboard;
