import { validators } from 'commons'

const { validateToken, validatePassword } = validators

function updateUserPassword(token, currPassword, newPassword, confirmPassword) {
    validateToken(token)
    validatePassword(currPassword, 'curr password')
    validatePassword(newPassword, 'new password')
    validatePassword(confirmPassword, 'confirm password')

    if (newPassword !== confirmPassword) throw new Error('retyped password doesn\'t match password') 

    return fetch('http://localhost:8080/api/users/change-password', {
        //MODIFY, PASSWORD
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currPassword, newPassword }) 
    })
        .then(res => {
            // const status = res.status
            const {status} = res

            if (status === 200) return
            
            else if (status >= 400 && status < 500) {
                
                return res.json()
                    .then(({error}) => {

                        throw new Error(error)

                    })
            } else if ( status >= 500) {
                
                throw new Error('server error')

            } else {
                throw new Error('unknown error')
            }
        })
}

export default updateUserPassword