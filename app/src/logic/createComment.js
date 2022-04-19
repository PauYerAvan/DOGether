import { validators } from 'commons'

const { validateToken, validateId, validateString } = validators

function createComment(token, locationId, text) {
    validateToken(token, 'token')
    validateId(locationId, 'location id')
    validateString(text, 'text')


    return fetch(`http://localhost:8080/api/locations/${locationId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
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

export default createComment