const bcrypt = require("bcryptjs");
const prisma = require("../prisma/prismaClient")
const jwt = require("jsonwebtoken")

async function loginUser(req, res) {

    // Getting content from body
    const { email, password } = req.body

    // Find the user
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    // If user not found
    if (!user)
        return res.status("401").json({ message: "Invalid Credentials" })

    // Check if passwords match
    const passwordsMatch = bcrypt.compare(password, user.passwordHash)

    // If Match
    if (!passwordsMatch)
        return res.status("401").json({ message: "Invalid Credentials" })

    // Make a new token for the user
    const token = jwt.sign({
        sub: user.id,
        email: user.email,
        isAuthor: user.isAuthor
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        })

    // Send token
    res.json({ token })


}

async function signUpUser(req, res) {

    // Getting content from body
    const { name, email, password } = req.body

    try {
        // Check that email must be unique
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser)
            return res.status(400).json({ error: "Email is already registered" });

        // Getting password hash
        const passwordHash = await bcrypt.hash(password, 10)

        // Creating a new user based on data
        const user = await prisma.user.create({
            data: {
                name, email, passwordHash
            }
        })

        // Return a status telling user was created
        res.status(201).json(user)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { loginUser, signUpUser }