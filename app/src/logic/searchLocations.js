import { validators } from 'commons'

const { validateToken, validateString } = validators

function searchLocations(token, query, type, city) {
    validateToken(token)
    if (query) validateString(query, 'query')
    if (type) validateString(type, 'type')
    if (city) validateString(city, 'city')

    return fetch(`http://localhost:8080/api/locations/search?${query ? `query=${query}` : ''}&${type ? `type=${type}` : ''}&${city ? `city=${city}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200) {
                return res.json()
            } else if (status >= 400 && status < 500) {
                return res.json()
                    .then(payload => {
                        const { error } = payload

                        throw new Error(error)
                    })
            } else if (status >= 500) {
                throw new Error('server error')
            } else {
                throw new Error('unknown error')
            }
        })
}

export default searchLocations