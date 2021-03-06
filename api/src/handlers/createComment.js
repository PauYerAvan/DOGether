const { verifyTokenAndGetUserId } = require('../helpers')
const { createComment } = require('logic')

module.exports = (req,res) => {
    try {
        const userId = verifyTokenAndGetUserId(req)

        const { body: { text }, params: { locationId } } = req    

        createComment(userId, locationId, text )    
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}