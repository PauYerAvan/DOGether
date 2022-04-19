const { validators: { validateId } } = require('commons')
const { models: { User, Location, Comment } } = require('data')

function listLocationComments(userId, locationId) {
    validateId(userId, 'user id')
    validateId(locationId, 'location id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Location.find({ user: userId })
        })
        .then(location => {
            if (!location) throw new Error(`location with id ${locationId} not found`)

            return Comment.find({ location: locationId }).lean().populate('user')
                .then(comments => {
                    comments.forEach(comment => {
                        //comment.id = comment._id.toString()
                        comment.userId = comment.user._id.toString()
                        comment.userName = comment.user.name
                        comment.id = comment._id.toString()

                        delete comment.user
                        delete comment.location
                        delete comment._id
                        delete comment.__v

                        return comment
                })
                    return comments
                        
                })
        })

}

module.exports = listLocationComments