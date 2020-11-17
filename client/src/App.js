import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { signout } from "./redux/slices/userSlice";

import MainLayout from "./styled-components/MainLayout";
import Authenticate from "./pages/Authenticate";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleLogout = () => {
    dispatch(signout())
  }
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return (
      <MainLayout>
        <Authenticate />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1>Authenticated!!!!</h1>
      <button onClick={handleLogout}>Log Out</button>
    </MainLayout>
  );
}

export default App;
