import './AddLocation.sass'
import { createLocation } from '../logic'
import { Input, Select } from '../components'
import { Button } from '../components'
import { data } from 'commons'
const { locationTypes, locationCities, defaultImage } = data

export function AddLocation({ onCreated }) {

    const addLocation = async event => {
        try {
            const { target: { type: { value: type }, title: { value: title }, image: { value: image }, address: { value: address }, city: { value: city } } } = event

            const urlImage = image === ''? defaultImage : image

            await createLocation(sessionStorage.token, type, title, urlImage, address, city)
            onCreated && onCreated()
            alert("Localización creada")

        } catch (error) {
            alert(error.message)
        }

    }

    const onSubmit = event => {
        event.preventDefault()
        addLocation(event)
    }



    return <div className="create-location">
        <h2 className="create-location__welcome">¡Añade tu localización!</h2>
        <form className="create-location__form" onSubmit={onSubmit}>
            <Select className="create-location__type" name="type" placeholder="Selecciona" options={locationTypes} required={true} label="Tipo"/>
            <Select className="create-location__city" name="city" placeholder="Selecciona" options={locationCities} required={true} label="Ciudad"/>
            <Input className="create-location__title" type="text" name="title" placeholder="Título" />
            <Input className="create-location__image" type="text" name="image" placeholder="url de imagen (opcional)"/>
            <Input className="create-location__address" type="text" name="address" placeholder="Dirección" />
            <Button className="button" type="submit" children="Crear"/>
        </form>
    </div>

}

