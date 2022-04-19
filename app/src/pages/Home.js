import './Home.sass'
import { SearchLocations, ListSearchResults } from '../components'

export const Home = ({ onSearchLocations, goToLocationDetails, goToHome }) => {

    return <div className="home">
        <div className="home-search">
            <SearchLocations onSearchLocations={onSearchLocations} onReset={goToHome} />
        </div>
        <div className="home-results">
            <ListSearchResults goToLocationDetails={goToLocationDetails} />
        </div>
    </div>


}