require('dotenv').config()

const { mongoose: { connect, disconnect } } = require('data')
const express = require('express')
const {
    registerUser,
    retrieveUser,
    authenticateUser,
    updateUser,
    updateUserPassword,
    listLocations,
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
    deleteComment
} = require('./handlers')

const cors = require('cors')

const { env: { PORT, MONGODB_URL } } = process

connect(MONGODB_URL)
    .then(() => console.log('db connected'))
    .then(() => {
        const server = express()

        server.use(cors())

        const jsonBodyParser = express.json()

        const api = express.Router()


        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.patch('/users', jsonBodyParser, updateUser)
        api.patch('/users/change-password', jsonBodyParser, updateUserPassword)
        api.get('/users/:ownerId/locations', listUserLocations)
        api.get('/users/follows', listFollowsUsers)
        api.patch('/users/:followId/follows', jsonBodyParser, toggleFollowUser)
        api.delete('/users', jsonBodyParser, deleteUser)

        api.post('/locations', jsonBodyParser, createLocation)
        api.get('/locations', listLocations)
        api.get('/locations/favorites', listFavoritesLocations)
        api.patch('/locations/:locationId/favorites', jsonBodyParser, toggleFavoriteLocation)
        api.get('/locations/search', searchLocations)
        api.patch('/locations/:locationId', jsonBodyParser, updateLocation)
        api.get('/locations/:locationId', retrieveLocation)
        api.delete('/locations/:locationId', deleteLocation)

        api.post('/locations/:locationId/comments', jsonBodyParser, createComment)
        api.get('/locations/:locationId/comments', listLocationComments)
        api.delete('/locations/comments/:commentId', deleteComment)



        server.use('/api', api)

        server.listen(8080, () => console.log('server started'))

    })