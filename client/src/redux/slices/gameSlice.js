import { createSlice } from "@reduxjs/toolkit";
import {
  newGame,
  getGame,
  saveGame,
  updateGame,
  getValidInput,
} from "../../api/gameApi";
import { determineAction } from "../../utility/gameActions";

let initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isResponseLoading: false,
  id: null,
  dateStarted: null,
  playerId: null,
  timePlayed: null,
  score: null,
  player: null,
  rooms: null,
  currentRoom: null,
  gameLog: null,
  status: null,
  playing: false,
  paused: false,
  response: "",
  error: null,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const startUpdate = (state) => {
  state.isUpdateLoading = true;
};

const startResponse = (state) => {
  state.isResponseLoading = true;
};

const loadingFailed = (state, action) => {
  const { error } = action.payload;
  state.isLoading = false;
  state.isUpdateLoading = false;
  state.isResponseLoading = false;
  state.error = error;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLoading: startLoading,
    setUpdateLoading: startUpdate,
    setResponseLoading: startResponse,
    getGameSuccess(state, action) {
      const { game } = action.payload;
      state.isLoading = false;
      state.isUpdateLoading = false;
      state.id = game["_id"];
      state.dateStarted = game.dateStarted;
      state.playerId = game.playerId;
      state.timePlayed = game.timePlayed;
      state.score = game.score;
      state.player = game.player;
      state.rooms = game.rooms;
      state.currentRoom = game.currentRoom;
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
    updateCurrentRoom(state, action) {
      const { room } = action.payload;
      state.currentRoom = room;
    },
    setPlaying(state) {
      state.playing = !state.playing;
    },
    setPaused(state) {
      state.paused = !state.paused;
    },
    setResponse(state, action) {
      const { response } = action.payload;
      state.isResponseLoading = false;
      state.response = response;
    },
    clearGame(state) {
      state.isLoading = false;
      state.isUpdateLoading = false;
      state.isResponseLoading = false;
      state.id = null;
      state.dateStarted = null;
      state.playerId = null;
      state.timePlayed = null;
      state.score = null;
      state.player = null;
      state.rooms = null;
      state.currentRoom = null;
      state.gameLog = null;
      state.status = null;
      state.playing = false;
      state.paused = false;
      state.response = "";
      state.error = null;
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  setUpdateLoading,
  setResponseLoading,
  getGameSuccess,
  getGameFailure,
  updateScore,
  updateTime,
  updateCurrentRoom,
  setPlaying,
  setPaused,
  setResponse,
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

export const saveUserGame = (
  id,
  timePlayed,
  score,
  player,
  rooms,
  currentRoom
) => async (dispatch) => {
  try {
    dispatch(setUpdateLoading());
    const game = await saveGame(
      id,
      timePlayed,
      score,
      player,
      rooms,
      currentRoom
    );
    if (game.error) {
      throw game.error;
    }
    dispatch(getGameSuccess({ game: game.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const patchGame = (id, field, value) => async (dispatch) => {
  try {
    dispatch(setUpdateLoading());
    const game = await updateGame(id, field, value);
    if (game.error) {
      throw game.error;
    }
    dispatch(getGameSuccess({ game: game.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const getInput = (input, room) => async (dispatch) => {
  try {
    dispatch(setResponseLoading());
    const response = await getValidInput(input);
    if (response.error) {
      throw response.error;
    }
    console.log(response);
    if (response.data.errors) {
      dispatch(setResponse({ response: response.data.info }));
    } else {
      let currentAction = determineAction(response.data.message, room);
      if (currentAction.action === "change-room") {
        dispatch(updateCurrentRoom({ room: currentAction.value }));
      }
      dispatch(setResponse({ response: currentAction.message }));
    }
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};
