import './NavigationMenu.sass'
import { Link, ProfileIcon, FavoriteIcon, SearchLocationIcon } from '.'


export function NavigationMenu({ onSearchLocationIcon, onFavoritesIcon, onProfileIcon }) {

    const goToSearchLocations = event => {
        event.preventDefault()
        onSearchLocationIcon(event)
    }

    const goToListFavorites = event => {
        event.preventDefault()
        onFavoritesIcon(event)
    }

    const goToProfile = event => {
        event.preventDefault()
        onProfileIcon(event)
    }


    return <nav className="navigation__container">
            <ul className="navigation__menu">
                <li><Link onClick={goToSearchLocations}><SearchLocationIcon/>Buscador</Link></li>
                <li><Link onClick={goToListFavorites}><FavoriteIcon/>Favoritas</Link></li>
                <li><Link onClick={goToProfile}><ProfileIcon/>Perfil</Link></li>
            </ul>
    </nav>
    
    

}