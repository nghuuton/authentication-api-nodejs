const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const https = require("https");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();

// Connect database
mongoose
  .connect("mongodb://localhost:27017/deck", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection database");
  })
  .catch((err) => {
    console.log(err);
  });
const corsOption = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOption));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const User = require("./routes/user");
const Deck = require("./routes/deck");
const { Passport } = require("passport");
app.use("/users", User);
app.use("/decks", Deck);
// Middleware
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

// Error handling
app.use((error, req, res, next) => {
  const err = process.env.ENV === "developer" ? error : {};
  const status = err.status || 500;
  return res.status(status).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

sslServer.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
