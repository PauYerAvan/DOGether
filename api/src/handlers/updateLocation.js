const { verifyTokenAndGetUserId } = require('../helpers')
const { updateLocation } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        
        const { body: { type, title, image, address, city }, params: { locationId} } = req

        updateLocation(userId, locationId, type, title, image, address, city)
            .then(() => res.status(200).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}