import React from "react";
import { Router, Redirect } from "@reach/router";

import { useSelector } from "react-redux";

import Authenticate from "./pages/Authenticate";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./styled-components/MainLayout";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  if (!isLoggedIn) {
    return (
      <MainLayout>
        <Redirect noThrow to="/login" />
        <Router>
          <Authenticate path="/login" />
        </Router>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Router>
        <Dashboard path="/" />
      </Router>
    </MainLayout>
  );
}

export default App;
