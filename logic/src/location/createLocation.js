const { validators: { validateId, validateString } } = require('commons')
const { models: { Location, User } } = require('data')

function createLocation(userId, type, title, image, address, city) {
    validateId(userId, 'userId')
    validateString(type, 'type')
    validateString(title, 'title')
    validateString(image, 'image')
    validateString(address, 'address')
    validateString(city, 'city')
    

    return User.findById(userId)

        .then(user => {

            if (!user) throw Error(`user with id ${userId} not found`)

            return Location.create({ user: userId, type, title, image, address, city })
        })
        .then(location => location.id)
    
}

module.exports = createLocation



