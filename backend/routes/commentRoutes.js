const { Router } = require("express")
const commentRouter = Router()
const { asyncHandler } = require("../middlewares/asyncHandler.js")
const { deleteComment } = require("../controllers/commentController.js")
const authenticate = require("../middlewares/authenticate.js")
const requireAuthor = require("../middlewares/requireAuthor.js")

commentRouter.delete(
    "/:id",
    authenticate,
    requireAuthor,
    asyncHandler(deleteComment)
)
module.exports = commentRouter