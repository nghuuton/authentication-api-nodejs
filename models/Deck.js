const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Deck = mongoose.model("Deck", deckSchema);
module.exports = Deck;
