import { createSlice } from "@reduxjs/toolkit";
import { newGame, getGame } from "../../api/gameApi";

let initialState = {
  isLoading: false,
  id: null,
  dateStarted: null,
  playerId: null,
  timePlayed: null,
  score: null,
  player: null,
  rooms: null,
  gameLog: null,
  status: null,
  playing: false,
  paused: false,
  error: null,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const loadingFailed = (state, action) => {
  const { error } = action.payload;
  state.isLoading = false;
  state.error = error;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLoading: startLoading,
    getGameSuccess(state, action) {
      const { game } = action.payload;
      state.isLoading = false;
      state.id = game["_id"];
      state.dateStarted = game.dateStarted;
      state.playerId = game.playerId;
      state.timePlayed = game.timePlayed;
      state.score = game.score;
      state.player = game.player;
      state.rooms = game.rooms;
      state.gameLog = game.gameLog;
      state.status = game.status;
      state.error = null;
    },
    getGameFailure(state) {
      state.isloading = false;
    },
    updateScore(state, action) {
      const { points } = action.payload;
      state.score = state.score + points;
    },
    updateTime(state) {
      state.timePlayed = state.timePlayed + 1;
    },
    setPlaying(state) {
      state.playing = !state.playing;
    },
    setPaused(state) {
      state.paused = !state.paused;
    },
    clearGame(state) {
      state.isLoading = false;
      state.id = null;
      state.dateStarted = null;
      state.playerId = null;
      state.timePlayed = null;
      state.score = null;
      state.player = null;
      state.rooms = null;
      state.gameLog = null;
      state.status = null;
      state.playing = false;
      state.paused = false;
      state.error = null;
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  getGameSuccess,
  getGameFailure,
  updateScore,
  updateTime,
  setPlaying,
  setPaused,
  clearGame,
  setFailure,
} = gameSlice.actions;

export default gameSlice.reducer;

export const startNewGame = (difficulty, name, playerId) => async (
  dispatch
) => {
  try {
    dispatch(setIsLoading());
    const game = await newGame(difficulty, name, playerId);
    if (game.error) {
      throw game.error;
    }
    dispatch(setPlaying());
    dispatch(getGameSuccess({ game: game.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const getUserGame = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    const game = await getGame(id);
    if (game.error) {
      throw game.error;
    }
    dispatch(getGameSuccess({ game: game.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};
