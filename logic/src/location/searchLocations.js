const { models: { Location, User } } = require('data')
const { validators: { validateString, validateId } } = require('commons')


function searchLocations(userId, query=null, type=null, city=null) {
    validateId(userId, 'user id')
    
    if (query === null && type === null && city === null)
        return new Promise(resolve => resolve([]))

    if (query) validateString(query, 'query')
    if (type) validateString(type, 'type') 
    if (city) validateString(city, 'city')

    
    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            
            const filters = { }
            
            if (query) {
                const QUERY_REGEX = new RegExp(query, 'i')
                const EXACT_REGEX = new RegExp(`^${query}$`, 'i');

                filters.$or = [{title: QUERY_REGEX},{address: QUERY_REGEX},{city: EXACT_REGEX}, {type: EXACT_REGEX}]
            }
            if (type) filters.type = type   
                
            if (city) filters.city = city

            return Location.find(filters).lean().populate('user')
        })
        .then(locations => {
            locations.forEach(location => {
                    
                location.id = location._id.toString()
                location.userId = location.user._id.toString()
                location.userName = location.user.name
                delete location._id
                delete location.__v
                delete location.user
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



