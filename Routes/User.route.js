require('dotenv').config()
const express = require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const { UserModel } = require('../Models/User.model')
const bcrypt = require("bcrypt")

// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token
// name ==> String
// email ==> String
// gender ==> String
// password ==> String
userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body
    const saltRound = 6
    try {
        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                res.send(`${err} while hashing`)
                console.log(err)
            } else {
                const user = new UserModel({ name, email, gender, password: hash })
                await user.save()
                res.send("Success in Regiser")
            }
        })
    } catch (error) {
        res.send("error in register")
        console.log(error)
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.find({ email });
        const hashed_pass = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashed_pass, (err, result) => {

                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key, { expiresIn: '1h' });
                    res.send({ "msg": "Login Successfull", "token": token });
                } else {
                    res.send("Wrong Credentials Please fill correct details");
                }
            });

        } else {
            res.send("Wrong Credentials Please fill correct details");
        }

    } catch (error) {
        res.send(`Error:${error} in Logging the user`)
        console.log(`Error:${error}`)
    }

})


module.exports = { userRouter }