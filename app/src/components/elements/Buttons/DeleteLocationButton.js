import './DeleteLocationButton.sass'
import { deleteLocation } from '../../../logic'
import { DeleteIcon } from '../../icons'
import { Button } from '.'


export function DeleteLocationButton({locationId, onDeletedLocation}) {

    const handleDeleteLocation = async event => {
        event.preventDefault()
        
        try{
            await deleteLocation(sessionStorage.token, locationId)
                alert("localización eliminada")
                onDeletedLocation()
        } catch (error) {
            alert(error.message)
        }
    }

  

    return <>
            <Button onClick={handleDeleteLocation}><DeleteIcon className="delete-icon"/></Button>
    </>
}



