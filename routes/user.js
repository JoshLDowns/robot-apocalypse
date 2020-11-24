const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.patch("/:id/update", (req, res) => {
  const { field, value } = req.body
  const id = req.params.id
  User.findOneAndUpdate({_id: id}, {[field]: value}, {new: true})
    .then((user) => {
      console.log(user);
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(400).json({ errors: err.toString(), info: "An error occured"})
    })
})

module.exports = router;