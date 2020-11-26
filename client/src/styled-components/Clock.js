import React from "react";

import { DisplayTextPurp } from "./Components";

import { useSelector } from "react-redux";
import { useTimeFormat } from "../hooks/useTimeFormat";

const Clock = () => {
  const time = useSelector((state) => state.game.timePlayed);
  const currentTime = useTimeFormat(time);

  return (
    <DisplayTextPurp>{`${currentTime.hours} :: ${currentTime.minutes} :: ${currentTime.seconds}`}</DisplayTextPurp>
  );
};

export default Clock;
