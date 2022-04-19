import './UserData.sass'
import { retrieveUser, updateUser } from '../logic'
import { useState, useEffect } from 'react'
import { Button, Input, Link } from '../components'

export function UserData({onUpdatePassword}) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(({ name, email }) => {
                    setName(name)
                    setEmail(email)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const updateData = event => {
        event.preventDefault()

        const { target:{ name: {value: name}, email: {value: email} } }  = event

        try {
            updateUser(sessionStorage.token, name, email)
                .then(() => {
                    setName(name)
                    setEmail(email)
                    alert('datos actualizados')
                })
                .catch(error => { throw error })
        } catch ({message}) {
            alert(message)
        }
    }

    const goToUpdatePassword = event => {
        event.preventDefault()

        onUpdatePassword()
    }


    return <div className="data">
        <form className="data__form" onSubmit={updateData} method="post">  
            <Input className="data__name-input" type="text" name="name" placeholder="Nombre" required={true} defaultValue={name} label="Nombre: "/>
            <Input className="data__email-input" type="email" name="email" placeholder="e-mail" required={true} defaultValue={email} label="e-mail: "/>
            <Button className="button" type="submit">Guardar cambios</Button>
            <Link className="link" href="" onClick={goToUpdatePassword}>Editar contraseña</Link>
        </form>

    </div>

}

