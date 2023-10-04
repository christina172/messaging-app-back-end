const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    username: { type: String, required: true, maxLength: 20 },
    password: { type: String, required: true },
    color: {
        type: String,
        required: true,
        enum: ["red", "blue", "yellow", "green", "orange", "purple", "pink"],
        default: "red",
    },
    chatsWith: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

// Export model
module.exports = mongoose.model("User", UserSchema);
