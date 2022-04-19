import './OwnerLocationCard.sass'
import { EditIcon, Link, DeleteLocationButton } from '.'


export function OwnerLocationCard({ location = {}, onUpdateLocation, onDeletedLocation, onLocationDetails }) {


    return <>
        <div className='user-card'>
            <h1 className="user-card__title">{location.title}</h1>
            <h2 className="user-card__type">{`Tipo: ${location.type}`}</h2>
            <img className="user-card__image" src={location.image} onClick={() => onLocationDetails(location.id) } />
            <h2 className="user-card__city">{`Ciudad: ${location.city}`}</h2>
            <Link onClick={() => onUpdateLocation(location.id)}><EditIcon className="user-card__edit"/></Link>
            <DeleteLocationButton className="delete-icon" locationId={location.id} onDeletedLocation={onDeletedLocation}/>
        </div>
    </>
}



