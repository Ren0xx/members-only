const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 70 },
    content: { type: String, required: true, minLength: 1, maxLength: 255 },
    timestamp: { type: Date, required: true, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Category", MessageSchema);
