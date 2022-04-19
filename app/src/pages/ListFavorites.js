import './ListFavorites.sass'
import { useState, useEffect } from 'react'
import { listFavoritesLocations } from '../logic'
import { LocationCard } from '../components'

export function ListFavorites({ goToLocationDetails }) {

    const [favorites, setFavorites] = useState([])


    useEffect(async () => {
        try {
            const favorites = await listFavoritesLocations(sessionStorage.token)

            favorites.forEach(favorite => favorite.isFavorite = true)

            setFavorites(favorites)

        } catch (error) {
            alert(error.message)
        }
    }, [])
    

    const updateListFavorites = async () => {
        try {
            const favorites = await listFavoritesLocations(sessionStorage.token)
            favorites.forEach(favorite => favorite.isFavorites = true)

            setFavorites(favorites)
        } catch (error) {
            alert(error.message)
        }
    }



    return <div>
        {!!favorites.length && <ul className="favorites__list">
            {favorites.map(favorite =>
                <li key={favorite.id}>
                    <LocationCard location={favorite} onLocationCard={goToLocationDetails} onToggled={updateListFavorites} />
                </li>)}
        </ul>}
    </div>
}