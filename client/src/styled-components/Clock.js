import React from "react";

import { LargePurpleText } from "./Components";

import { useSelector } from "react-redux";
import { useTimeFormat } from "../hooks/useTimeFormat";

const Clock = () => {
  const time = useSelector((state) => state.game.timePlayed);
  const currentTime = useTimeFormat(time);

  return (
    <LargePurpleText>{`${currentTime.hours} :: ${currentTime.minutes} :: ${currentTime.seconds}`}</LargePurpleText>
  );
};

export default Clock;
