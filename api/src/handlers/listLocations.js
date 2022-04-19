const { verifyTokenAndGetUserId } = require('../helpers')
const { listLocations } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        listLocations(userId)
            .then(locations => res.json(locations))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}