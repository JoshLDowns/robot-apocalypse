import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, logout } from "../../api/userApi";

let initialState = {
  isLoading: false,
  isLoggedIn: false,
  id: null,
  username: null,
  activeGame: false,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: startLoading,
    setAuthenticateSuccess(state, action) {
      let { user } = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.id = user["_id"];
      state.username = user.username;
      state.activeGame = user["active_game"];
      state.error = null;
    },
    setActiveGame(state) {
      state.activeGame = !state.activeGame;
    },
    setUserLoggedOut(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.id = false;
      state.username = null;
      state.activeGame = false;
      state.error = null;
    },
    setFailure: loadingFailed,
  },
});

export const {
  setIsLoading,
  setAuthenticateSuccess,
  setActiveGame,
  setUserLoggedOut,
  setFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const authenticate = (
  username,
  password,
  confirmPassword,
  type
) => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    console.log(confirmPassword);
    if (confirmPassword !== null && password !== confirmPassword) {
      throw new Error("Passwords must match!");
    }
    const user = await authenticateUser(username, password, type);
    if (user.error) {
      throw user.error;
    }
    dispatch(setAuthenticateSuccess({ user: user.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const signout = () => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    const status = await logout();
    if (status.error) {
      throw status.error;
    }
    dispatch(setUserLoggedOut());
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};
