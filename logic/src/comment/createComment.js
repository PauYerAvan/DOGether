const { validators: { validateId, validateString } } = require('commons')
const { models: { Comment, User } } = require('data')

function createComment(userId, locationId, text) {
    validateId(userId, 'user id')
    validateId(locationId, 'location id')
    validateString(text, 'text')

    return User.findById(userId)

        .then(user => {

            if (!user) throw Error(`user with id ${userId} not found`)

            return Comment.create({ user: userId, location: locationId, text })
        })
        .then(comment => comment.id)
        //.then(comment => { })
}

module.exports = createComment