import './LocationCard.sass'
import { FavoriteButton } from '.'


export function LocationCard({ location = {}, onLocationCard, onToggled}) {

    
    return <>
        <div className="card">
            <FavoriteButton locationId={location.id} isFavorite={location.isFavorite} onToggled={onToggled}/>
            <h1 className="card__title">{location.title}</h1>
            <h2 className="card__type">{`Tipo: ${location.type}`}</h2>
            <img className="card__image" src={location.image} onClick={() => onLocationCard(location.id)}/>
            <h2 className="card__city">{`Ciudad: ${location.city}`}</h2>
        </div>
    </>
}

