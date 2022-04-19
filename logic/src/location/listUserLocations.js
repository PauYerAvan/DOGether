const { validators: { validateId } } = require('commons')
const { models: { User, Location } } = require('data')

function listUserLocations(userId, ownerId) {
    validateId(userId, 'user id')
    validateId(ownerId, 'owner id')

    return Promise.all([User.findById(userId).lean(), User.findById(ownerId).lean()])
        .then(([user, owner]) => {
            if (!user) throw new Error(`user with id ${ownerId} not found`)
            if (!owner) throw new Error(`owner with id ${ownerId} not found`)

            return Location.find({ user: ownerId }).lean()
                .then(locations => {
                    locations.forEach(location => {
                        location.id = location._id.toString()

                        delete location._id
                        delete location.user
                        delete location.__v

                        return location
                    })

                    return locations
                })
        })
}

module.exports = listUserLocations

