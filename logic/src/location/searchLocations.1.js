const { models: { Location, User } } = require('data')
const { validators: { validateString, validateId } } = require('commons')


function searchLocations(userId, {query, type, city}={}) {
    validateId(userId, 'user id')
    if (query) validateString(query, 'query')
    if (type) validateString(type, 'type') 
    if (city) validateString(city, 'city')

    const QUERY_REGEX = new RegExp(query, 'i')
    const EXACT_REGEX = new RegExp(`^${query}$`, "i");

    let filters

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            if (query) {
                if (type && city) { 
                    filters = { $or:[{title: QUERY_REGEX},{address: QUERY_REGEX},{city: EXACT_REGEX}, {type: EXACT_REGEX}], type, city}
                }
                else if (type) {
                    filters = { $or:[{title: QUERY_REGEX},{address: QUERY_REGEX},{city: EXACT_REGEX}, {type: EXACT_REGEX}], type}
                }
                else if (city) {
                    filters = { $or:[{title: QUERY_REGEX},{address: QUERY_REGEX},{city: EXACT_REGEX}, {type: EXACT_REGEX}], city}
                }
                else {
                    filters = { $or:[{title: QUERY_REGEX},{address: QUERY_REGEX},{city: EXACT_REGEX}, {type: EXACT_REGEX}]}
                }
            }

            else if (type) {
                if (city) {
                    filters = {type, city}
                }
                else {
                    filters = {type}
                }
            }

            else if (city) {
                filters = {city}
            }
            else {
                filters = { }
             }


            return Location.find(filters).lean().populate('user')
        })
        .then(results => {
           
            const locations = results.map(location => {
                
                location.id = location._id.toString()
                location.userId = location.user._id.toString()
                location.userName = location.user.name
                delete location._id
                delete location.__v
                delete location.user


                return location
            })

            return locations
        })
}

module.exports = searchLocations


























// const { models: { Location } } = require('data')
// const { validators: { validateString } } = require('commons')


// function searchLocations(query) {
//     validateString (query, 'query')

//     const QUERY_REGEX = new RegExp(query, 'i')


//     return Location.find({$or:[{title: QUERY_REGEX},{type: QUERY_REGEX},{address: QUERY_REGEX},{city: QUERY_REGEX}]})
//         .then(results => {
           
//             const locations = results.map(location => {

//                 const location = location._location
                
//                 location.id = location._id.toString()
//                 delete location.user
//                 delete location._id
//                 delete location.__v


//                 return location
//             })

//             return locations
//         })
// }

// module.exports = searchLocations



