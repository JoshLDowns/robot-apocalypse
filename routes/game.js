const express = require("express");
const router = express.Router();
const Game = require("../models/gamestate");
const ValidInput = require("../game-logic/input-generator");
const generateGame = require("../game-logic/game-generator");

const validateInput = new ValidInput();

router.post("/find", (req, res) => {
  const stringObj = validateInput.getFirstLast(req.body.input);
  if (!stringObj) {
    res
      .status(200)
      .json({
        errors: "invalid input",
        info: "I am not sure what that means ...",
      });
  } else {
    let response = validateInput.returnInput(stringObj);
    console.log(response);
    res.status(200).json({ message: response });
  }
});

router.post("/new", (req, res) => {
  const gameState = generateGame(
    req.body.difficulty,
    req.body.name,
    req.body.playerId
  );
  const newGame = new Game(gameState);
  newGame
    .save()
    .then((game) => {
      console.log(game);
      res.status(200).json(game);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errors: err.toString(), info: "An error occured" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = Game.where({ playerId: id });
  query
    .findOne()
    .then((game) => {
      console.log(game);
      res.status(200).json(game);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errors: err.toString(), info: "An error occured" });
    });
});

router.patch("/:id/update", (req, res) => {
  const id = req.params.id;
  const { field, value } = req.body;
  Game.findByIdAndUpdate(
    {_id: id},
    {[field]: value},
    {new: true}
  )
  .then((game) => {
    console.log(game);
    res.status(200).json(game);
  })
  .catch((err) => {
    res.status(400).json({ errors: err.toString(), info: "An error occured"})
  })
})

router.post("/save/:id", (req, res) => {
  const { timePlayed, score, player, rooms, currentRoom } = req.body;
  const id = req.params.id;
  Game.findOneAndUpdate(
    { _id: id },
    {
      timePlayed: timePlayed,
      score: score,
      player: player,
      rooms: rooms,
      currentRoom: currentRoom,
    }, 
    {new: true}
  )
  .then((game) => {
    console.log(game);
    res.status(200).json(game);
  })
  .catch((err) => {
    res.status(400).json({ errors: err.toString(), info: "An error occured"})
  })
});

module.exports = router;
