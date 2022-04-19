const { models: { User, Location, Comment } } = require('data')
const { validators: { validateId, validatePassword } } = require('commons')

const anonymousId = '6231feb0c2d80f1fc73a8d34'
// Esto se podría guardar en un env... como en api

function deleteUser(userId, password) {
        validateId(userId, 'user id')
        validatePassword(password, 'password')

        return User.findOne({_id: userId, password})
        
        .then((user) => {

            if (!user) throw new Error(`wrong user ${userId} or password`)

            return Location.updateMany({ user: userId }, { user: anonymousId })
        })

        .then((result) => { 
            return Comment.deleteMany({user: userId})
        })  

        .then((result) => User.deleteOne({ _id: userId, password }))
        
        .then(result => {
            if (result.deletedCount === 0) throw new Error(`user with ${userId} can't be deleted`)
        })
}

module.exports = deleteUser









