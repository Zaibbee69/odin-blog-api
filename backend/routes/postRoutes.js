const { Router } = require("express")
const postRouter = Router()
const { getAllPosts, getPost, addPost, updatePost, deletePost } = require("../controllers/postController")
const { asyncHandler } = require("../middlewares/asyncHandler")

postRouter.get("/", asyncHandler(getAllPosts))
postRouter.get("/:id", asyncHandler(getPost))
postRouter.post("/", asyncHandler(addPost))
postRouter.put("/:id", asyncHandler(updatePost))
postRouter.delete("/:id", asyncHandler(deletePost))

module.exports = postRouter