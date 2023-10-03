const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// express app
const app = express();

app.use(morgan('dev'));

// listen for requests 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});



