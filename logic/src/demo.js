const { mongoose: { connect, disconnect }, models: { User, Location, Comment } } = require('data')
const { mainModule } = require('process')
const {
    registerUser,
    authenticateUser,
    updateUser,
    retrieveUser,
    updateUserPassword,
    deleteUser,
    toggleFavoriteLocation,
    listFavoritesLocations,
    createComment,
    listLocationComments,
    deleteComment,
    searchLocations,
    createLocation,
    retrieveLocation,
    listLocations,
    listUserLocations,
    updateLocation,
    deleteLocation
} = require('./index')

let commentId1
let commentId2
let locationId1
let locationId2
let aguaGrilloId
let fireGrilloId
let pepitoId
let pirulinId

connect('mongodb://localhost:27017/dogether-db')
    // .then(() => Promise.all([
    //     //User.deleteMany()
    // ]))


    .then(() => Promise.all([
       
        User.deleteMany(),
        Location.deleteMany(),
        Comment.deleteMany()
    ]))
    .then(() => registerUser('Pepito Grillo', 'pepito@grillo.com', '123123123'))
    .then(() => console.log('user registered'))


    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => console.log('user id', userId))

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return retrieveUser(userId)
            .then(user => console.log(user))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return updateUser(userId, 'Pepita Grilla', 'pepito@grillo.com')
            .then(() => console.log('user updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return updateUserPassword(userId, '123123123', '123123123')
            .then(() => console.log('password updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {

        const location1 = createLocation(userId, 'Hotel', 'Hotel Polaquera', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/26/ee/4e/su-entrada-principal.jpg', 'Rua la Polaca, 98', 'Barcelona')
            .then(locationId => {
                locationId1 = locationId
                console.log('location created', locationId)
            })

        const location2 = createLocation(userId, 'Playa', 'Playa de la Concha', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/26/ee/4e/su-entrada-principal.jpg', 'Calle la conchita, 67', 'Tarragona')
            .then(locationId => {
                locationId2 = locationId
                console.log('location created', locationId)
            })

        return Promise.all([location1, location2])
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        pepitoId = userId
        return listLocations(userId)
            .then((listLocations) => console.log(listLocations))
    })

    .then(() => registerUser('Pirulin', 'pirulin@mail.com', '123123123'))
    .then(() => console.log('pirulin registered'))

    .then(() => authenticateUser('pirulin@mail.com', '123123123'))
    .then(userId => {
        ownerId = pepitoId
        return listUserLocations(userId, ownerId)
            .then((listUserLocations) => console.log(listUserLocations))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return updateLocation(userId, locationId1, 'Hotel', 'Hostal Polaquera', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/26/ee/4e/su-entrada-principal.jpg', 'Rua las Polacas, 98', 'Barcelona')
            .then(() => console.log('location updated'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return retrieveLocation(userId, locationId1)
            .then(location => console.log(location))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return toggleFavoriteLocation(userId, locationId1)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return toggleFavoriteLocation(userId, locationId2)
            .then(() => console.log('favorite toggled'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        return listFavoritesLocations(userId)
            .then(favorites => console.log(favorites))
    })


    .then(() => registerUser('Agua Grillo', 'agua@grillo.com', '123123123'))
    .then(() => console.log('user2 registered'))

    .then(() => authenticateUser('agua@grillo.com', '123123123'))
    .then(userId => { aguaGrilloId = userId })

    .then(() => registerUser('Fire Grillo', 'fire@grillo.com', '123123123'))
    .then(() => console.log('user2 registered'))

    .then(() => authenticateUser('fire@grillo.com', '123123123'))
    .then(userId => { fireGrilloId = userId })



    .then(() => authenticateUser('agua@grillo.com', '123123123'))
    .then(userId => deleteUser(userId, '123123123'))
    .then(() => console.log('user deleted'))

    .then(() => authenticateUser('fire@grillo.com', '123123123'))
    .then(userId => deleteUser(userId, '123123123'))
    .then(() => console.log('user deleted'))


    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then(userId => {
        const comment1 = createComment(userId, locationId1, 'Playa muy sucia llena de cacas')
            .then(commentId => {
                commentId1 = commentId
                console.log('comment created', commentId)
            })
        const comment2 = createComment(userId, locationId1, 'Playa muy sucia llena de humanos')
            .then(commentId => {
                commentId2 = commentId
                console.log('comment created', commentId)
            })
        return Promise.all([comment1, comment2])
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then((userId) => {
        return listLocationComments(userId, locationId1)
            .then((listComments) => console.log(listComments))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then((userId) => {
        return deleteComment(userId, commentId1)
            .then(() => console.log('comment deleted'))
    })

    .then(() => authenticateUser('pepito@grillo.com', '123123123'))
    .then((userId) => {
        return deleteLocation(userId, locationId1)
            .then(() => console.log('location deleted'))
    })


    //   .then(() => searchLocations('6231feb0c2d80f1fc73a8d35', '', 'Playa', null))
    //   .then((results) => console.log(results))


    .catch(error => console.error(error.message))
    .then(() => disconnect())