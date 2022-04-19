import './Profile.sass'
import { Link } from '../components'


export function Profile({ onUserData, onListLocations, onAddLocation, onDeleteAccount, onLogOut }) {

    const logOut = event => {
        event.preventDefault()
        delete sessionStorage.token
        onLogOut()
    }

    return <>
        <div className="profile" >
            <ul className="profile__list">
                <li><Link className="profile__link-dates" onClick={onUserData}>Mis datos</Link></li>
                <li><Link className="profile__link-add-location" onClick={onAddLocation}>Crear localización</Link></li>
                <li><Link className="profile__link-my-locations" onClick={onListLocations}>Mis localizaciones</Link></li> 
                <li><Link className="profile__link-delete-account" onClick={onDeleteAccount}>Eliminar cuenta</Link></li>
                <li><Link className="profile__link-delete-account" onClick={logOut}>Cerrar sesión</Link></li>
            </ul>
        </div>
    </>
}

