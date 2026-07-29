const { Router } = require("express")
const postRouter = Router()
const { getAllPosts, getPost, addPost } = require("../controllers/postController")


postRouter.get("/", getAllPosts)
postRouter.get("/:id", getPost)
postRouter.post("/", addPost)

module.exports = postRouter