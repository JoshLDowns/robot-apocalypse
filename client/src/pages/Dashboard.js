import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";

import { useDispatch, useSelector } from "react-redux";

import { getUserGame } from "../redux/slices/gameSlice";
import { signout } from "../redux/slices/userSlice";

import { ClickableText, CenterDiv } from "../styled-components/Components";

import NewGame from "../styled-components/NewGame.js";

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

const OptionsMenu = ({ open, handleLogout, handleSave }) => {
  return (
    <ListWrapper open={open}>
      <ListOption onClick={handleSave}>~ save game</ListOption>
      <ListOption onClick={handleLogout}>~ logout</ListOption>
    </ListWrapper>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [optionsOpen, setOptionsOpen] = useState(false);

  const user = useSelector((state) => state.user.username);
  const playerId = useSelector((state) => state.user.id);
  const active = useSelector((state) => state.user.activeGame);
  const isGameLoading = useSelector((state) => state.game.isLoading);

  const handleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };

  const handleLogout = () => {
    dispatch(signout());
  };

  const handleSave = () => {
    //TODO
    console.log("saving");
  };

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
        />
        {active ? (
          <h1>{`Welcome back to the apocalypse ${user}...`}</h1>
        ) : (
          <h1>{`Welcome to the apocalypse ${user}...`}</h1>
        )}
        <br />
        <br />
        <br />
        <NewGame name={user} playerId={playerId}/>
      </CenterDiv>
    </>
  );
};

export default Dashboard;
