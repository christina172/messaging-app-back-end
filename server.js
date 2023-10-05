const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const router = require('./routes/router');

// express app
const app = express();

app.use(morgan('dev'));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

// listen for requests 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});



