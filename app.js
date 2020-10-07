const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
