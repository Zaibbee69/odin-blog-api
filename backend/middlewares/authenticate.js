const jwt = require("jsonwebtoken")

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    // If no header present
    if (!authHeader)
        return res.sendStatus(401)

    // Get token from header
    const token = authHeader.split(" ")[1]

    // Verify the payload of jwt
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next()
    }
    catch {
        return res.sendStatus(403)
    }
}

module.exports = authenticate