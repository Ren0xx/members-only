const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 70 },
    content: { type: String, required: true, minLength: 1, maxLength: 255 },
    timestamp: { type: Date, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
});
MessageSchema.virtual("date_formatted").get(function () {
    return this.timestamp
        ? DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED)
        : "";
});
module.exports = mongoose.model("Messages", MessageSchema);
