import { validators } from 'commons'

const { validateToken, validateId } = validators

function deleteComment(token, commentId) {
    validateToken(token, 'token')
    validateId(commentId, 'comment id')
    
    return fetch(`http://localhost:8080/api/locations/comments/${commentId}`, {

        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {

            const { status } = res

            // // happy path
            if (status === 204) return // undefined

            else if (status >= 400 && status < 500) {

                // return JSON.parse(res.body)

                return res.json()
                    .then(({ error }) => { // payload*, body, error

                        throw new Error(error) // Error tiene una propiedad message

                    })
            }
            else if (status >= 500) throw new Error('server error')

            else throw new Error('unknown error')


        })
}

export default deleteComment
