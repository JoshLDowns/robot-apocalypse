import { createSlice } from "@reduxjs/toolkit";
import {
  newGame,
  getGame,
  saveGame,
  updateGame,
  getValidInput,
} from "../../api/gameApi";
import {
  determineAction,
  determineLogMessage,
} from "../../utility/gameActions";

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
  isInventoryOpen: false,
  isLogOpen: false,
  isHelpOpen: false,
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
    pickupItem(state, action) {
      const { item, room } = action.payload;
      console.log(room.roomId);
      let useableInventory;
      let currentRooms = state.rooms.map((rm) => {
        if (rm.roomId === room.roomId) {
          console.log(rm);
          let currentInventory = [...rm.inventory];
          useableInventory = currentInventory;
          if (item !== "All") {
            currentInventory.splice(currentInventory.indexOf(item), 1);
          }
          if (item === "All") {
            currentInventory = [];
          }
          return {
            ...rm,
            inventory: currentInventory,
          };
        } else
          return {
            ...rm,
          };
      });
      let currentPlayerInventory = [...state.player.inventory];
      if (item !== "All") {
        currentPlayerInventory.push(item);
      }
      if (item === "All") {
        useableInventory.forEach((i) => currentPlayerInventory.push(i));
      }
      state.rooms = currentRooms;
      state.player = {
        ...state.player,
        inventory: currentPlayerInventory,
      };
    },
    dropItem(state, action) {
      const { item, room } = action.payload;
      let currentRooms = state.rooms.map((rm) => {
        if (rm.roomId === room.roomId) {
          let currentInventory = [...rm.inventory, item];
          return {
            ...rm,
            inventory: currentInventory,
          };
        } else
          return {
            ...rm,
          };
      });
      let currentPlayerInventory = state.player.inventory;
      currentPlayerInventory.splice(currentPlayerInventory.indexOf(item), 1);
      state.rooms = currentRooms;
      state.player = {
        ...state.player,
        inventory: currentPlayerInventory,
      };
    },
    setInventoryOpen(state) {
      state.isInventoryOpen = !state.isInventoryOpen;
      state.isLogOpen = false;
      state.isHelpOpen = false;
    },
    setLogOpen(state) {
      state.isLogOpen = !state.isLogOpen;
      state.isInventoryOpen = false;
      state.isHelpOpen = false;
    },
    setHelpOpen(state) {
      state.isHelpOpen = !state.isHelpOpen;
      state.isInventoryOpen = false;
      state.isLogOpen = false;
    },
    updateLog(state, action) {
      const { entry } = action.payload;
      state.player = {
        ...state.player,
        log: state.player.log.reverse().concat(entry).reverse(),
      };
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
      state.isInventoryOpen = false;
      state.isLogOpen = false;
      state.isHelpOpen = false;
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
  pickupItem,
  dropItem,
  setInventoryOpen,
  setLogOpen,
  setHelpOpen,
  updateLog,
  clearGame,
  setFailure,
} = gameSlice.actions;

export default gameSlice.reducer;

export const startNewGame =
  (difficulty, name, playerId) => async (dispatch) => {
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

export const saveUserGame =
  (id, timePlayed, score, player, rooms, currentRoom) => async (dispatch) => {
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

export const getInput = (input, room, player) => async (dispatch) => {
  try {
    dispatch(setResponseLoading());
    const response = await getValidInput(input);
    if (response.error) {
      throw response.error;
    }
    if (response.data.errors) {
      dispatch(setResponse({ response: response.data.info }));
    } else {
      let currentAction = determineAction(response.data.message, room, player);
      if (currentAction.action === "change-room") {
        dispatch(updateCurrentRoom({ room: currentAction.value }));
      }
      if (currentAction.action === "get-item") {
        dispatch(pickupItem({ item: currentAction.value, room: room }));
      }
      if (currentAction.action === "drop-item") {
        dispatch(dropItem({ item: currentAction.value, room: room }));
      }
      if (currentAction.action === "toggle-inventory") {
        dispatch(setInventoryOpen());
      }
      if (currentAction.action === "toggle_log") {
        dispatch(setLogOpen());
      }
      if (currentAction.action === "toggle-help") {
        dispatch(setHelpOpen());
      }
      dispatch(setResponse({ response: currentAction.message }));
      if (!currentAction.action.includes("toggle")) {
        dispatch(
          updateLog({
            entry: {
              time: new Date().toLocaleTimeString(),
              input: input,
              message: determineLogMessage(currentAction),
            },
          })
        );
      }
    }
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};
