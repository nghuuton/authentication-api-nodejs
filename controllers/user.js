const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const gerenateToken = (id) => {
    const token = JWT.sign(
        {
            iss: "Deck App",
            sub: id,
        },
        process.env.SECRET,
        {
            expiresIn: "15s",
        }
    );
    return token;
};

const index = async (req, res, next) => {
    const users = await User.find({}).populate("decks", ["name"]);
    return res.status(200).json({ users });
};

const createUser = async (req, res, next) => {
    const user = new User(req.value.body);
    await user.save();
    return res.status(201).json({ success: true });
};

const getUser = async (req, res, next) => {
    const { id } = req.value.params;
    const user = await User.findById(id);
    return res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
    const { id } = req.value.params;
    const newUser = req.value.body;
    const user = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json({ success: true, user });
};

const signIn = async (req, res, next) => {
    const token = gerenateToken(req.user._id);
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true });
};

const signUp = async (req, res, next) => {
    const newUser = new User(req.value.body);
    await newUser.save();
    const token = gerenateToken(newUser._id);
    res.setHeader("Authorization", token);
    return res.status(201).json({ success: true });
};

const secret = async (req, res, next) => {
    return res.status(200).json({ success: true });
};

module.exports = { index, createUser, getUser, updateUser, signIn, signUp, secret };
