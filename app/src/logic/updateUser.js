import { validators } from 'commons'
const { validateToken, validateEmail, validateString } = validators

function updateUser(token, name, email) {
    validateToken(token)
    validateString(name, 'name')
    validateEmail(email)

    return fetch('http://localhost:8080/api/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email })
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

export default updateUser
