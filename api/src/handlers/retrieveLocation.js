const { verifyTokenAndGetUserId } = require('../helpers')
const { retrieveLocation } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        const { params: { locationId } } = req

        retrieveLocation(userId, locationId)
            .then(location => res.json(location))
            .catch(error => res.status(400).json({ error: error.message }) )
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
