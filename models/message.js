const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: { type: String, required: true, maxLength: 1000 },
    timestamp: { type: Date, default: Date.now() },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);