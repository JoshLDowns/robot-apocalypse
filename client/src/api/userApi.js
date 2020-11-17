import axios from "axios";

export const authenticateUser = async (username, password, type) => {
  const response = { status: "", data: null, error: null };
  await axios
    .post("/api/auth/register_login", {
      username: username,
      password: password,
      type: type,
    })
    .then((res) => {
      console.log(res);
      response.status = "ok";
      response.data = res.data.user;
    })
    .catch((err) => {
      console.log(err.response.data)
      response.status = "error";
      response.error = err.response.data.info ? err.response.data.info.message : err.response.data.errors;
    });
  return response;
};

export const logout = async () => {
  const response = { status: "", error: null }
  await axios
    .get("/api/auth/signout")
    .then((_res) => {
      response.status = "ok"
    })
    .catch((err) => {
      response.status = "error";
      response.error = err.toString();
    })
}
