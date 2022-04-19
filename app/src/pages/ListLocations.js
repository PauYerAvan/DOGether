import './ListLocations.sass'
import { useState, useEffect } from 'react'
import { listLocations } from '../logic'
import { OwnerLocationCard } from '../components/'

export function ListLocations({ goToLocationDetails, goToUpdateLocation }) {
    const [locations, setLocations] = useState([])


    useEffect(async () => {
        try {
            const locations = await listLocations(sessionStorage.token)
            setLocations(locations)

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const updateListLocations = async() => {
        try {
            const locations = await listLocations(sessionStorage.token)
            setLocations(locations)

        } catch (error) {
            alert(error.message)
        }
    }


    return <div className="locations">
        {!!locations.length && <ul className="locations__list">
            {locations.map(location =>
                <li key={location.id}>
                    <OwnerLocationCard location={location} onUpdateLocation={goToUpdateLocation} onDeletedLocation={updateListLocations} onLocationDetails={goToLocationDetails} />
                </li>)}
        </ul>}
    </div>
}