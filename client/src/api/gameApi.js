import axios from "axios";

export const newGame = async (difficulty, name, playerId) => {
  const response = { status: "", data: null, error: null };
  await axios
    .post("/api/game/new", {
      difficulty: difficulty,
      name: name,
      playerId: playerId,
    })
    .then((res) => {
      console.log(res);
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      response.status = "error";
      response.error = err.response.data.info
        ? err.response.data.info.message
        : err.response.data.errors;
    });
  return response;
};

export const getGame = async (id) => {
  const response = { status: "", data: null, error: null };
  await axios
    .get(`/api/game/${id}`)
    .then((res) => {
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      response.status = "error";
      response.error = err.response.data.info
        ? err.response.data.info.message
        : err.response.data.errors;
    });
  return response;
};

export const saveGame = async (
  id,
  timePlayed,
  score,
  player,
  rooms,
  currentRoom,
) => {
  const response = { status: "", data: null, error: null };
  await axios
    .post(`/api/game/save/${id}`, {
      timePlayed: timePlayed,
      score: score,
      player: player,
      rooms: rooms,
      currentRoom: currentRoom,
    })
    .then((res) => {
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      response.status = "error";
      response.error = err.response.data.info
        ? err.response.data.info.message
        : err.response.data.errors;
    });
};

export const updateGame = async (id, field, value) => {
  const response = { status: "", data: null, error: null };
  await axios
    .patch(`/api/game/${id}/update`, {
      field: field,
      value: value,
    })
    .then((res) => {
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
      input: input,
    })
    .then((res) => {
      response.status = "ok";
      response.data = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      response.status = "error";
      response.error = err.response.data.info
        ? err.response.data.info.message
        : err.response.data.errors;
    });
  return response;
};
