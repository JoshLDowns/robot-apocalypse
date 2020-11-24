import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;