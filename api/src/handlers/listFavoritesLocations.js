const { verifyTokenAndGetUserId } = require('../helpers')
const { listFavoritesLocations } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        listFavoritesLocations(userId)
            .then(favorites => res.json(favorites))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}