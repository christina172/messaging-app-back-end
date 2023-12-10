const User = require("../models/user");

const loginUser = async (req, res) => {
    res.json({ message: "Login route" })
};

const signupUser = async (req, res) => {
    res.json({ message: "Sign-up route" })
}

module.exports = { loginUser, signupUser };