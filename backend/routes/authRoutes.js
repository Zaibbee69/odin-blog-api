const { Router } = require("express")
const authRouter = Router()
const { loginUser, signUpUser } = require("../controllers/authController")

authRouter.post("/login", loginUser)
authRouter.post("/signup", signUpUser)

module.exports = authRouter 