const { models: { User } } = require('data')
const { validators: { validateId, validatePassword } }  = require('commons')

function updateUserPassword(userId, currPassword, newPassword) {
    validateId(userId, 'user id')
    validatePassword(currPassword, 'current password')
    validatePassword(newPassword, 'new password')

    return User.findById(userId)
    .then(user => {
        if(!user) throw new Error(`user with id ${userId} does not exist`)
        return User.updateOne({_id: userId, password: currPassword}, {password: newPassword})
        .then(result => {
            if(result.matchedCount === 0) throw new Error ('wrong credentials')
            // return undefined
        })
    })  
}


module.exports = updateUserPassword