const { Router } = require("express")
const postRouter = Router()
const { getAllPosts, getPost } = require("../controllers/postController")


postRouter.get("/", getAllPosts)
postRouter.get("/:id", getPost)

module.exports = postRouter