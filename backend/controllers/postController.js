const prisma = require("../prisma/prismaClient")

async function getAllPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: { status: "PUBLISHED" }
        })
        return res.status(200).json({ posts })
    }
    catch (err) {
        console.error(err)
        res.status(403).json("Error Occurred")
    }
}

async function getPost(req, res) {

    const postId = parseInt(req.params.id, 10)

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        // If no post found
        if (!post)
            return res.status(403).json("No Post Found")

        return res.status(200).json({ post })
    }
    catch (err) {
        console.error(err)
        return res.status(403).json("Error Occurred")
    }
}

async function addPost(req, res) {

    const { title, content, status } = req.body

    // Get the user
    const user = req.user

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                status,
                user: {
                    connect: { id: user.sub }
                }
            }
        })

        return res.status(201).json({ post })

    }
    catch (err) {
        console.error(err)
        return res.status(403).json("Error Occurred")
    }
}

module.exports = { getAllPosts, getPost, addPost }