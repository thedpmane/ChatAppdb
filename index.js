require('dotenv').config()
const express = require("express")
const cors = require("cors");
const { connection } = require('./Configs/db');
const { userRouter } = require('./Routes/User.route');
const { authenticate } = require('./Middlewares/auth.middleware');
const { chatRouter } = require('./Routes/Chat.route');

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", chatRouter)
app.get("/", (req, res) => {
    res.send("Welcome to the hompage of chat application")
})
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log(error)
        console.log("Trouble connection to the DB")
    }
})