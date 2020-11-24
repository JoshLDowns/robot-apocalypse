import axios from "axios";

export const newGame = async (difficulty, name, playerId) => {
  const response = { status: "", data: null, error: null };
  await axios
    .post("/api/game/new", {
      difficulty: difficulty,
      name: name,
      playerId: playerId
    })
    .then((res) => {
      console.log(res);
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data)
      response.status = "error";
      response.error = err.response.data.info ? err.response.data.info.message : err.response.data.errors;
    });
  return response;
}

export const getGame = async (id) => {
  const response = { status: "", data: null, error: null };
  await axios
    .get(`/api/game/${id}`)
    .then((res) => {
      console.log(res);
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data)
      response.status = "error";
      response.error = err.response.data.info ? err.response.data.info.message : err.response.data.errors;
    });
  return response;
}

export const getValidInput = async (input) => {
  const response = { status: "", data: null, error: null };
  await axios
    .post("/api/game/find", {
      input: input
    })
    .then((res) => {
      console.log(res);
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data)
      response.status = "error";
      response.error = err.response.data.info ? err.response.data.info.message : err.response.data.errors;
    });
  return response;
}