function requireAuthor(req, res, next) {
    if (!req.user.isAuthor)
        return res.sendStatus(403)

    next()
}

module.exports = requireAuthor