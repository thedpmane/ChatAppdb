// title ==> String
// body ==> String
// device ==> String

const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String
})

const ChatModel = mongoose.model("posts", chatSchema);

module.exports = { ChatModel }