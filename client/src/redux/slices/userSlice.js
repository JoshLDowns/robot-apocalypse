import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, logout, updateUser } from "../../api/userApi";
import { navigate } from "@reach/router";

let initialState = {
  isLoading: false,
  isUpdateLoading: false,
  isLoggedIn: false,
  id: null,
  username: null,
  activeGame: false,
  error: null,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const startUpdate = (state) => {
  state.isUpdateLoading = true;
}

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
    setUpdateLoading: startUpdate,
    setAuthenticateSuccess(state, action) {
      let { user } = action.payload;
      state.isLoading = false;
      state.isUpdateLoading = false;
      state.isLoggedIn = true;
      state.id = user["_id"];
      state.username = user.username;
      state.activeGame = user["active_game"];
      state.error = null;
    },
    setActiveGame(state) {
      state.activeGame = !state.activeGame;
    },
    clearErrors(state) {
      state.error = null;
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
  setUpdateLoading,
  setAuthenticateSuccess,
  setActiveGame,
  clearErrors,
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
    console.log(user);
    if (user.error) {
      throw user.error;
    }
    dispatch(setAuthenticateSuccess({ user: user.data }));
    navigate("/");
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const signout = () => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    const status = await logout();
    console.log(status);
    if (status.error) {
      throw status.error;
    }
    dispatch(setUserLoggedOut());
    navigate("/login")
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
};

export const patchUser = (id, field, value) => async (dispatch) => {
  try {
    dispatch(setUpdateLoading());
    const user = await updateUser(id, field, value);
    if (user.error) {
      throw user.error;
    }
    dispatch(setAuthenticateSuccess({ user: user.data }));
  } catch (err) {
    dispatch(setFailure({ error: err.toString() }));
  }
}
