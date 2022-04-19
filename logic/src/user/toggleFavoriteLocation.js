const { models: { User, Location } } = require('data')
const { validators: { validateId } } = require('commons')

function toggleFavoriteLocation(userId, locationId) {
    validateId(userId, 'user id')
    validateId(locationId, 'location id')

    let location

    return Location.findById(locationId)
        .then(_location => {
            if (!_location) throw new Error(`location with id ${locationId} does not exist`)
            location = _location
            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)
            const index = user.favorites.indexOf(location.id)

            if (index === -1) user.favorites.push(location.id)
            else user.favorites.splice(index, 1)

            return user.save()       
        })
        .then(user => { })
    
}

module.exports = toggleFavoriteLocation


