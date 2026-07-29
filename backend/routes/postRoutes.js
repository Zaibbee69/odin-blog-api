const { Router } = require("express")
const postRouter = Router()
const { getAllPosts, getPost, addPost, updatePost, deletePost, publishPost, unPublishPost } = require("../controllers/postController")
const { asyncHandler } = require("../middlewares/asyncHandler")

postRouter.get("/", asyncHandler(getAllPosts))
postRouter.get("/:id", asyncHandler(getPost))
postRouter.post("/", asyncHandler(addPost))
postRouter.put("/:id", asyncHandler(updatePost))
postRouter.delete("/:id", asyncHandler(deletePost))
postRouter.patch("/:id/publish", asyncHandler(publishPost))
postRouter.patch("/:id/unpublish", asyncHandler(publishPost))

module.exports = postRouter