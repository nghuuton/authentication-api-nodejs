const Deck = require("../models/Deck");
const User = require("../models/User");

const index = async (req, res, next) => {
    const decks = await Deck.find({});
    return res.status(200).json({ decks });
};

const getDeck = async (req, res, next) => {
    const { id } = req.params;
    const deck = await Deck.findById(id);
    return res.status(200).json({ deck });
};

const createDeck = async (req, res, next) => {
    const newDeck = new Deck(req.body);
    await newDeck.save();
    const user = await User.findById(req.body.owner);
    user.decks.push(newDeck._id);
    await user.save();
    return res.status(201).json({ deck: newDeck });
};

const updateDeck = async (req, res, next) => {
    const newDeck = req.body;
    const { id } = req.params;
    if (req.body.owner) {
        const deck = await Deck.findById(id);
        const currentUser = await User.findById(deck.owner);
        currentUser.decks.pull(deck);
        await currentUser.save();
        const newUser = await User.findById(req.body.owner);
        newUser.decks.push(deck);
        await newUser.save();
    }
    const deck = await Deck.findByIdAndUpdate(id, newDeck, { new: true });
    return res.status(200).json({ deck });
};

const deleteDeck = async (req, res, next) => {
    const { id } = req.params;
    const deck = await Deck.findById(id);
    const user = await User.findById(deck.owner);
    user.decks.pull(deck);
    await user.save();
    await Deck.findByIdAndRemove(id);
    return res.status(200).json({ success: true });
};

module.exports = { index, createDeck, updateDeck, deleteDeck, getDeck };
