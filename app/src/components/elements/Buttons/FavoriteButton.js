import './FavoriteButton.sass'
import { useState, useEffect } from 'react'
import { toggleFavoriteLocation } from '../../../logic'
import { FavoriteIcon } from '../../icons'
import { Button } from '.'

export function FavoriteButton({ locationId, isFavorite= false, onToggled }) {

    const [favorite, setFavorite] = useState(isFavorite)

    // useEffect(() => {

    //     setFavorite(isFavorite)

    // }, [isFavorite])


    const toggleFavorite = async () => {
        try {
            await toggleFavoriteLocation(sessionStorage.token, locationId)
            setFavorite(!favorite)
            onToggled && onToggled()

        } catch (error) {
            alert(error.message)
        }
    }

    const onToggle = event => {
        event.preventDefault()
        toggleFavorite(event)
    }

    return <>
        <Button type="button" onClick={onToggle}>
            <FavoriteIcon className={`${favorite ? 'favorite-full' : 'favorite-empty'}`} />
        </Button>
    </>
}

