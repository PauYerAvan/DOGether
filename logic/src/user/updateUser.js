const { models: { User } } = require("data")
const { validators: { validateId, validateString, validateEmail } } = require('commons')


function updateUser(userId, name, email) {
    validateId(userId, 'user id')
    validateString(name, 'name')
    validateEmail(email, 'email')

    return User.updateOne({ _id: userId }, { name, email })
        .then(result => {
            if (result.matchedCount === 0) throw new Error(`user with id ${userId} does not exist`)
        })
}

module.exports = updateUser

