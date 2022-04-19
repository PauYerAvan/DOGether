const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')

function retrieveUser(userId) {
    validateId(userId, 'user id')

    return User.findById(userId).lean().select('name email id') 
        .then((user) => {

            if (!user) throw new Error(`user with id ${userId} does not exist`)
           
            user.id = user._id.toString()
            delete user._id
            

            return user
        })
}


module.exports = retrieveUser