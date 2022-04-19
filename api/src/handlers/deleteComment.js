const { verifyTokenAndGetUserId } = require('../helpers')
const { deleteComment } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        const { params: { commentId } } = req  

        deleteComment(userId, commentId) 
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}