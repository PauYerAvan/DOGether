const { toggleFollowUser } = require("logic")
const { verifyTokenAndGetUserId } = require('../helpers')

module.exports = (req, res) => {
    try {

        const userId = verifyTokenAndGetUserId(req)
        const { params: { followId } } = req

        toggleFollowUser(userId, followId)
        .then(follows => res.json(follows))
        .catch(error => res.status(400).json({ error: error.message }))
} catch (error) {
    res.status(400).json({ error: error.message })
}
}