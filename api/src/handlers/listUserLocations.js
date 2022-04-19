const { verifyTokenAndGetUserId } = require('../helpers')
const { listUserLocations } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        const { params: { ownerId } } = req

        listUserLocations(userId, ownerId)
            .then(locations => res.json(locations))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}