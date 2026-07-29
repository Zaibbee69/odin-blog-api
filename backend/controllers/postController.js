const prisma = require("../prisma/prismaClient")

async function getAllPosts(req, res) {

    const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" }
    })
    return res.status(200).json({ posts })


}

async function getPost(req, res) {

    const postId = parseInt(req.params.id, 10)


    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    // If no post found
    if (!post)
        return res.status(403).json("No Post Found")

    return res.status(200).json({ post })

}

async function addPost(req, res) {

    const { title, content, status } = req.body

    // Get the user
    const user = req.user

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

async function updatePost(req, res) {
    const { title, content, status } = req.body
    const postId = parseInt(req.params.id, 10)

    const user = req.user

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            content,
            status
        }
    })

    return res.status(200).json({ post })

}

async function deletePost(req, res) {
    const postId = parseInt(req.params.id, 10)

    await prisma.post.delete({
        where: { id: postId }
    })

    return res.status(200).json("Post Deleted!")
}

async function publishPost(req, res) {
    const postId = parseInt(req.params.id, 10)

    const post = await prisma.post.update({
        where: { id: postId },
        data: { status: "PUBLISHED" }
    })

    return res.status(200).json({ post })
}

async function unPublishPost(req, res) {
    const postId = parseInt(req.params.id, 10)

    const post = await prisma.post.update({
        where: { id: postId },
        data: { status: "NOT_PUBLISHED" }
    })
    return res.status(200).json({ post })

}

async function postComment(req, res) {
    const postId = parseInt(req.params.id, 10)
    const { content } = req.body
    const user = req.user

    const comment = await prisma.comment.create({
        data: {
            content,
            user: {
                connect: { id: user.sub }
            },
            post: {
                connect: { id: postId }
            }
        }
    })

    return res.status(200).json({ comment })
}

module.exports = { getAllPosts, getPost, addPost, updatePost, deletePost, publishPost, unPublishPost, postComment }