const bcrypt = require("bcryptjs");
const prisma = require("../prisma/prismaClient")

function loginUser(req, res) {

}

function signUpUser(req, res) {

    // Getting content from body
    const { name, email, password } = req.body

    // Getting password hash
    const passwordHash = await bcrypt.hash(password, 10)

    // Creating a new user based on data
    const user = await prisma.user.create({
        data: {
            name, email, passwordHash
        }
    })

    // Return a status telling user was created
    req.status(201).json(user)
}

module.exports = { loginUser, signUpUser }