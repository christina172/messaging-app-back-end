#! /usr/bin/env node

const bcryptjs = require("bcryptjs");

console.log(
    'This script populates some test users, chats and messages to the database.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");
const Chat = require("./models/chat");
const Message = require("./models/message");

const users = [];
const chats = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createChats();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
};

async function userCreate(index, name, username, password, color) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcryptjs.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    });
    const user = new User({
        name: name,
        username: username,
        password: hashedPassword,
        color: color,
        chatsWith: []
    });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${name}`);
};

async function chatCreate(index, users) {
    const chat = new Chat({
        users: users
    });

    const userOne = users[0];
    const userTwo = users[1];
    userOne.chatsWith.push(userTwo);
    await userOne.save();
    userTwo.chatsWith.push(userOne);
    await userTwo.save();

    await chat.save();
    chats[index] = chat;
    console.log(`Added chat between: ${users[0].name} and ${users[1].name}`);
};

async function messageCreate(index, text, from, chat) {
    const message = new Message({
        text: text,
        timestamp: Date.now(),
        from: from,
        chat: chat,
    });

    await message.save();
    messages[index] = message;
    console.log(`Added message from ${from.name}: ${text}`);
};

async function createUsers() {
    console.log("Adding users");
    await Promise.all([
        userCreate(0, "Anthony Andrews", "tony87", "12345678", "red"),
        userCreate(1, "Beatrice Bennett", "beattie46", "87654321", "orange"),
        userCreate(2, "Charlotte Clarke", "lottie75", "password", "yellow"),
        userCreate(3, "David Doyle", "david24", "drowssap", "blue"),
        userCreate(4, "Emily Evans", "emily39", "qwertyui", "green"),
        userCreate(5, "Felicity Foster", "felicity18", "asdfghjk", "pink"),
    ])
};

async function createChats() {
    console.log("Adding chats");
    await chatCreate(0, [users[0], users[3]]);
    await chatCreate(1, [users[1], users[2]]);
    await chatCreate(2, [users[1], users[4]]);
    await chatCreate(3, [users[1], users[5]]);
    await chatCreate(4, [users[2], users[3]]);
};

async function createMessages() {
    console.log("Adding messages");
    await messageCreate(0, "Hey, David!", users[0], chats[0]);
    await messageCreate(1, "Hi, Tony!", users[3], chats[0]);
    await messageCreate(2, "Hello!", users[2], chats[1]);
    await messageCreate(3, "Hi, Emily! How are you doing? Would you like to come to my party on Saturday?", users[1], chats[2]);
    await messageCreate(4, "Hi, Beattie! I'm alright. And you? Yes, I would love to.", users[4], chats[2]);
    await messageCreate(5, "Hello, Felicity! I've invited my friend Emily to the party.", users[1], chats[3]);
    await messageCreate(6, "Hi, David! Did you go to the concert yesterday?", users[2], chats[4]);
};