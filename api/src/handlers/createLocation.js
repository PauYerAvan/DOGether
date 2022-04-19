const { verifyTokenAndGetUserId } = require('../helpers')
const { createLocation } = require('logic')

module.exports = (req,res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        const { body: { type, title, image, address, city } } = req

        createLocation(userId, type, title, image, address, city)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}