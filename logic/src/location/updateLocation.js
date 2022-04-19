const { validators: { validateId, validateString } } = require('commons')
const { models: { User, Location } } = require('data')


function updateLocation(userId, locationId, type, title, image, address, city) {
  validateId(userId, 'user id')
  validateId(locationId, 'location id')
  validateString(type, 'type')
  validateString(title, 'title')
  validateString(image, 'image')
  validateString(address, 'address')
  validateString(city, 'city')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new Error(`user with id ${userId} not found`)

      return Location.findById(locationId)
    })
    .then(location => {
      if (!location) throw new Error(`location with id ${locationId} not found`)

      if (location.user.toString() !== userId) throw new Error(`location with id ${locationId} does not correspond to user with id ${userId}`)

      location.type = type
      location.title = title
      location.image = image
      location.address = address
      location.city = city

      return location.save()
    })
    .then(location => { })
}

module.exports = updateLocation




