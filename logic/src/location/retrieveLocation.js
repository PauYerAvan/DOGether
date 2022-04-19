const { validators: { validateId } } = require('commons')
const { models: { Location, User } } = require('data')

function retrievelocation(userId, locationId) {
    validateId(userId, 'user id')
    validateId(locationId, 'location id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Location.findById(locationId).lean().populate('user')
        })
        .then(location => {
            if(!location) throw new Error(`location with id ${locationId} does not exist`)
            
            location.id = location._id.toString()
            
            delete location._id
            delete location.__v
            
            location.userId = location.user._id.toString()
            location.userName = location.user.name 
            
            delete location.user
    
            return location
            
        })
}


module.exports = retrievelocation

