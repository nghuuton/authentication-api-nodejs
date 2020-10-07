const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcryptjs");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  decks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Deck",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bycrypt.genSalt(10);
    const newPasswood = await bycrypt.hash(this.password, salt);
    this.password = newPasswood;
    next();
  } catch (error) {
    newt(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const result = await bycrypt.compare(userPassword, this.password);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
