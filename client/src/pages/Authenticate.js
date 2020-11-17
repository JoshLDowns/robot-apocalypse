import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAuthenticateForm } from "../hooks/useAuthenticateForm";

import { authenticate } from "../redux/slices/userSlice";

import {
  AuthenticateInput,
  LargeButton,
  SmallButton,
  CenterDiv,
} from "../styled-components/Components";

import { SmallSpinLoader } from "../styled-components/AnimatedComponents";

const Authenticate = () => {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const {
    name,
    password,
    confirmPassword,
    handleChange,
    reset,
  } = useAuthenticateForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let confirm = isLoggingIn ? null : confirmPassword;
    let type = isLoggingIn ? "login" : "sign-up";
    console.log(confirm);
    dispatch(authenticate(name, password, confirm, type));
    reset();
  };

  return (
    <CenterDiv>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "500px",
        }}
      >
        <AuthenticateInput
          error={error}
          type="text"
          value={name}
          name="username"
          id="name"
          onChange={handleChange}
          placeholder={
            error && error.includes("User") ? "Invalid Username!" : "Username"
          }
        />
        <AuthenticateInput
          error={error}
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={handleChange}
          placeholder={
            error && error.includes("password") ? "Wrong Password!" : "Password"
          }
        />
        {!isLoggingIn && (
          <AuthenticateInput
            error={error}
            type="password"
            value={confirmPassword}
            name="confirm-password"
            id="confirm"
            onChange={handleChange}
            placeholder={
              error && error.includes("taken")
                ? "Username already exists!"
                : "Confirm Password"
            }
          />
        )}
        <br />
        <LargeButton type="submit">
          {!isLoading ? (isLoggingIn ? "Log In!" : "Sign Up!") : null}
          {isLoading && <SmallSpinLoader />}
        </LargeButton>
      </form>
      <br />
      <SmallButton onClick={() => setIsLoggingIn(!isLoggingIn)}>
        {isLoggingIn ? "Not a member? Sign Up!" : "Already a member? Log In!"}
      </SmallButton>
    </CenterDiv>
  );
};

export default Authenticate;
