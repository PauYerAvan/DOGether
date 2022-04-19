import { validators } from 'commons'

const { validateToken, validateString } = validators

function createLocation(token, type, title, image, address, city) {
    validateToken(token, 'token')
    validateString(type, 'type')
    validateString(title, 'title')
    validateString(image, 'image')
    validateString(address, 'address')
    validateString(city, 'city')

    return fetch('http://localhost:8080/api/locations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type, title, image, address, city })
    })
        .then(res => {
            const { status } = res

            if (status === 201) {
                return
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

export default createLocation