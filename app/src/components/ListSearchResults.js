import './ListSearchResults.sass'
import { useEffect, useState } from 'react'
import { searchLocations, listFavoritesLocations } from '../logic'
import { LocationCard } from './'
import { useSearchParams } from 'react-router-dom'


export function ListSearchResults({ goToLocationDetails }) {

    const [locations, setLocations] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')
    const _type = searchParams.get('type')
    const _city = searchParams.get('city')

    useEffect(async () => {
        try {

            const type = _type ? _type : ''
            const city = _city ? _city : ''

            const locations = await searchLocations(sessionStorage.token, query, type, city)
            const favorites = await listFavoritesLocations(sessionStorage.token)

            locations.forEach(location => {
                location.isFavorite = favorites.some(({ id }) => id === location.id) 
            })

            setLocations(locations.reverse())

        } catch (error) {
            alert(error.message)
        }
    }, [query, _type, _city])


    return <div>
            {!!locations.length && <ul >
                {locations.map(location =>
                    <li key={location.id} >
                        <LocationCard location={location} onLocationCard={goToLocationDetails} />
                    </li>)}
            </ul>}
    </div>

}
