import React from "react";
import styled from "@emotion/styled/macro";

import { useSelector } from "react-redux";

import { SmallGreenText } from "../styled-components/Components";

const HealthWrapper = styled("div")`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const HealthBarWrapper = styled("div")`
  width: 75%;
  border: 3px solid #d4098f;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
`

const HealthBar = styled("div")`
  width: ${props => `${props.width}%`};
  height: 100%;
  background-color: ${props => props.width > 25 ? "#29d409" : "#d40929"};
`

const Health = () => {
  const health = useSelector((state) => state.game.player.health);
  const maxHealth = useSelector((state) => state.game.player.maxHealth);

  return (
    <HealthWrapper>
      <SmallGreenText>{`${health} / ${maxHealth}`}</SmallGreenText>
      <HealthBarWrapper>
        <HealthBar width={Math.ceil((health/maxHealth) * 100)} />
      </HealthBarWrapper>
    </HealthWrapper>
  )
};

export default React.memo(Health);
