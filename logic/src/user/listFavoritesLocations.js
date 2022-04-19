const { models: { User } } = require('data')
const { validators: { validateId } } = require('commons')

function listFavoritesLocations(userId) {
    validateId(userId, 'user id')

    return User.findById(userId).populate('favorites')
        .then(user => {
            if (!user) throw Error(`user with id ${userId} does not exist`)

            return Promise.all(user.favorites.map(favorite => favorite.populate('user')))
        })
        .then(favorites => favorites.map(location => {
                const favorite = location._doc
                favorite.id = favorite._id.toString()
                favorite.userId = favorite.user._id.toString()
                favorite.userName = favorite.user.name

                delete favorite.user
                delete favorite._id
                delete favorite.__v
                delete favorite.address

                return favorite
            })
        )
}

module.exports = listFavoritesLocations



