require("dotenv").config();
const express = require("express");
const session = require("express-session")
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");
const game = require("./routes/game");
const MONGO_URI = `mongodb+srv://emorobot:${process.env.MONGO_PASSWORD}@game-files.zzpfd.mongodb.net/game-files?retryWrites=true&w=majority`

mongoose
  .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log(`MongoDB connected!`))
  .catch(err => console.log(err));

//app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
app.use("/api/game", game);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
