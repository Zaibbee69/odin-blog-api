const bcrypt = require("bcryptjs");
const prisma = require("../prisma/prismaClient")

function loginUser(req, res) {

}

async function signUpUser(req, res) {

    // Getting content from body
    const { name, email, password } = req.body

    console.log(req.body)

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