import { validators } from 'commons'

const { validateToken, validateId, validateString } = validators

function updateLocation(token, locationId, type, title, image, address, city) {
    validateToken(token, 'token')
    validateId(locationId, 'location id')
    validateString(type, 'type')
    validateString(title, 'title')
    validateString(image, 'image')
    validateString(address, 'address')
    validateString(city, 'city')

    return fetch(`http://localhost:8080/api/locations/${locationId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type, title, image, address, city })
    })
        .then(res => {
            // const status = res.status
            const { status } = res

            if (status === 200) {

                return

            } else if (status >= 400 && status < 500) {
                
                // return res.json().then(({ error }) => {
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

export default updateLocation
