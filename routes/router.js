const express = require('express');
const router = express.Router();

const chat_controller = require("../controllers/chatController");
const message_controller = require("../controllers/messageController");
const { loginUser, signupUser } = require("../controllers/userController");

// Login route
router.post("/log-in", loginUser);

// Sign-up route
router.post("/sign-up", signupUser);

// GET all chats
router.get("/chats", (req, res) => {
    res.json({ message: "GET all chats" })
});

// GET all or searched for users
router.get("/users", (req, res) => {
    const { name } = req.query;
    if (name) {
        res.json({ message: `GET users whose name includes ${name}` });
    } else {
        res.json({ message: "GET all users" });
    }
});

// GET all chat messages
router.get("/chats/:chatid/messages", (req, res) => {
    res.json({ message: `GET all chat (id: ${req.params.chatid}) messages` })
});

// POST (create) a chat
router.post("/chats", (req, res) => {
    res.json({ message: "POST (create) a chat" })
});

// POST (write) a message in a chat
router.post("/chats/:chatid/messages", (req, res) => {
    res.json({ message: `POST (write) a message in a chat (id: ${req.params.chatid})` })
});

// DELETE a chat
router.delete("/chats/:chatid", (req, res) => {
    res.json({ message: `DELETE a chat (id: ${req.params.chatid})` })
});

// DELETE a message in a chat
router.delete("/chats/:chatid/messages/:messageid", (req, res) => {
    res.json({ message: `DELETE a message (id: ${req.params.messageid}) in a chat (id: ${req.params.chatid})` })
});

module.exports = router;