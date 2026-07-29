const prisma = require("../prisma/prismaClient")

async function deleteComment(req, res) {
    const commentId = parseInt(req.params.id, 10)

    await prisma.comment.delete({
        where: { id: commentId }
    })

    return res.status(200).json("Comment Deleted")
}

module.exports = { deleteComment }