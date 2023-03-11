const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        unique: true,
    },
    password: { type: String, required: true },
    status: { type: String, default: "NEWBIE" },
});

module.exports = mongoose.model("User", UserSchema);
