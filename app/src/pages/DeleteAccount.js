import './DeleteAccount.sass'
import { deleteUser } from '../logic'
import { Button, Link, Input } from '../components'

export function DeleteAccount ({onBack, onDeletedAccount}) {

    const deleteAccount = async event => {
        event.preventDefault()
        
        const password = event.target.password.value

        try{
           await deleteUser(sessionStorage.token, password)
                delete sessionStorage.token
                onDeletedAccount()
                alert("Perfil eliminado") 
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="delete-account">
        <form className="delete-account__form" method="post" onSubmit={deleteAccount}>
            <Input className="delete-account__password-input" type="password" name="password" placeholder="contraseña"></Input> 
            <Button type="submit" className="button">Eliminar cuenta</Button>
            <Link className="link" href="" onClick={onBack}>Atrás</Link>
        </form>
    </div>

}

