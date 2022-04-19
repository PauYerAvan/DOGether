import './LocationDetails.sass'
import { useState, useEffect } from 'react'
import { retrieveLocation, listFavoritesLocations } from '../logic'
import { FavoriteButton, ListComments } from '../components'
import { useParams } from 'react-router-dom'

export function LocationDetails({onToggled}) {
    const { locationId } = useParams()

    const [location, setLocation] = useState({})

    useEffect(async () => {
        try {
            const location = await retrieveLocation(sessionStorage.token, locationId)
            const favorites = await listFavoritesLocations(sessionStorage.token)

            location.isFavorite = favorites.some(({ id }) => id === location.id)
            setLocation(location)

        } catch (error) {
            alert(error.message)
        }
    }, [])



    return <>
        <div className="details">
            <FavoriteButton locationId={location.id} isFavorite={location.isFavorite} onToggled={onToggled} /> 
            <h1 className="details__title">{location.title}</h1>
            <p className="details__date">{new Date(location.date).toLocaleDateString()}</p>
            <img className="details__image" src={location.image} />
            <h2 className="details__type">{`Tipo: ${location.type}`}</h2>
            <p className="details__address">{location.address}</p>
            <p className="details__city">{location.city}</p>
            <ListComments locationId={locationId} />
        </div>
    </>
}

//onToggled={()=>{}}