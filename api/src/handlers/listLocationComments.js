const { verifyTokenAndGetUserId } = require('../helpers')
const { listLocationComments } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)
        
        const { params: { locationId } } = req

        listLocationComments(userId, locationId)
            .then(comments => res.json(comments))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}