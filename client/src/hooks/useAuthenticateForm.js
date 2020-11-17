import { useState } from "react";

export const useAuthenticateForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (evt) => {
    if (evt.target.id === "name") {
      setName(evt.target.value);
    }
    if (evt.target.id === "password") {
      setPassword(evt.target.value);
    }
    if (evt.target.id === "confirm") {
      setConfirmPassword(evt.target.value);
    }
  };

  return {
    name,
    password,
    confirmPassword,
    handleChange,
    reset: () => {
      setName("");
      setPassword("");
      setConfirmPassword("");
    }
  }
};
