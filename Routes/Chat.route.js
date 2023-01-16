const express = require("express");
const { ChatModel } = require("../Models/Chat.model");
const chatRouter = express.Router();

chatRouter.get("/", async (req, res) => {
    const chat = await ChatModel.find()
    res.send(chat)
})


chatRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const new_chat = new ChatModel(payload)
        await new_chat.save()
        res.send("chat created here")
    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})
//63c3d8bae89a9d0f34f03f38

chatRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const chat = await ChatModel.findOne({ "_id": id })
    const userID_in_chat = chat.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_chat) {
            res.send("You are not authorized")
        } else {
            await ChatModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("chat updated here")
        }

    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})

chatRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const chat = await ChatModel.findOne({ "_id": id })
    const userID_in_chat = chat.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_chat) {
            res.send("You are not authorized")
        } else {
            await ChatModel.findByIdAndDelete({ "_id": id })
            res.send("chat deleted here")
        }

    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})

module.exports = { chatRouter }