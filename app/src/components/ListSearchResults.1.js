import './ListSearchResults.sass'
import { useEffect, useState } from 'react'
import { searchLocations, listFavoritesLocations } from '../logic'
import { LocationCard} from './'


export function ListSearchResults({ query = '', type = '', city = '', onLocationCard }) {
    const [locations, setLocations] = useState([])


    useEffect(async () => {
        try {
            const locations = await searchLocations(sessionStorage.token, query, type, city)
            const favorites = await listFavoritesLocations(sessionStorage.token)

            locations.forEach(location => {
                location.isFavorite = favorites.some(({ id }) => id === location.id)
            })

            setLocations(locations)


        } catch (error) {
            alert(error.message)
        }
    }, [query, type, city])

    return <div>
        {!!locations.length && <ul>
            {locations.map(location =>
                <li key={location.id} >
                    <LocationCard location={location} onLocationCard={onLocationCard}/>
                </li>)}
        </ul>}
    </div>

}
