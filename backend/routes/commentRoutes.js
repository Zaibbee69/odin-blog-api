const { Router } = require("express")
const commentRouter = Router()
const { asyncHandler } = require("../middlewares/asyncHandler.js")
const { deleteComment } = require("../controllers/commentController.js")

commentRouter.delete("/:id", asyncHandler(deleteComment))

module.exports = commentRouter