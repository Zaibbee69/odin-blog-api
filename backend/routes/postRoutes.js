const { Router } = require("express")
const postRouter = Router()
const { getAllPosts, getPost, addPost, updatePost, deletePost, publishPost, unPublishPost, postComment, allPosts } = require("../controllers/postController")
const { asyncHandler } = require("../middlewares/asyncHandler")
const requireAuthor = require("../middlewares/requireAuthor")
const authenticate = require("../middlewares/authenticate")

postRouter.get("/", asyncHandler(getAllPosts))
postRouter.get("/all", authenticate, requireAuthor, asyncHandler(allPosts))
postRouter.get("/:id", asyncHandler(getPost))
postRouter.post("/", authenticate, requireAuthor, asyncHandler(addPost))
postRouter.post(
    "/:id/comments",
    authenticate,
    asyncHandler(postComment)
)
postRouter.put("/:id", authenticate, requireAuthor, asyncHandler(updatePost))
postRouter.delete("/:id", authenticate, requireAuthor, asyncHandler(deletePost))
postRouter.patch("/:id/publish", authenticate, requireAuthor, asyncHandler(publishPost))
postRouter.patch("/:id/unpublish", authenticate, requireAuthor, asyncHandler(unPublishPost))

module.exports = postRouter