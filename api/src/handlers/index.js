const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const updateUserPassword = require('./updateUserPassword')
const deleteUser = require('./deleteUser')
const createLocation = require('./createLocation')
const retrieveLocation = require('./retrieveLocation')
const updateLocation = require('./updateLocation')
const listUserLocations = require('./listUserLocations')
const deleteLocation = require('./deleteLocation')
const searchLocations = require('./searchLocations')
const listFavoritesLocations = require('./listFavoritesLocations')
const listFollowsUsers = require('./listFollowsUsers')
const createComment = require('./createComment')
const listLocationComments = require('./listLocationComments')
const deleteComment = require('./deleteComment')
const toggleFavoriteLocation = require('./toggleFavoriteLocation')
const toggleFollowUser = require('./toggleFollowUser')
const listLocations = require('./listLocations')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    updateUserPassword,
    listUserLocations,
    toggleFavoriteLocation,
    listFavoritesLocations,
    toggleFollowUser,
    listFollowsUsers,
    deleteUser,
    createLocation,
    retrieveLocation,
    updateLocation,
    deleteLocation,
    searchLocations,
    createComment,
    listLocationComments,
    deleteComment,
    listLocations
}