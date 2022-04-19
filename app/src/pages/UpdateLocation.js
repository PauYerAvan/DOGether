import './UpdateLocation.sass'
import { updateLocation, retrieveLocation } from '../logic'
import { Input, Select, Button } from '../components'
import { data } from 'commons'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
const { locationTypes, locationCities } = data

export function UpdateLocation({ onModify }) {
    const { locationId } = useParams()
    
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')


    useEffect(async() => {
        try {
            
            const location = await retrieveLocation(sessionStorage.token, locationId)
            const  { type, title, image, address, city } = location
                setType(type)
                setTitle(title)
                setImage(image)
                setAddress(address)
                setCity(city)
                
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const modifyLocation = async event => {
        try {
            const { target: { type: { value: type }, title: { value: title }, image: { value: image }, address: { value: address }, city: { value: city } } } = event


            await updateLocation(sessionStorage.token, locationId, type, title, image, address, city)
            onModify()
            alert("localización modificada")

        } catch (error) {
            alert(error.message)
        }

    }

    const onSubmit = event => {
        event.preventDefault()
        modifyLocation(event)
    }



    return <div>
        <form className="update-location__form" onSubmit={onSubmit}>
            <Select className="update-location__type" name="type" placeholder="type"options={locationTypes} required={true} selected={type} label="Tipo"/>
            <Select className="update-location__city" name="city" placeholder="city"options={locationCities} required={true} selected={city} label="Ciudad"/>
            <Input className="update-location__title" type="text" name="title" placeholder="Título" defaultValue={title} label="Título" />
            <Input className="update-location__image" type="text" name="image" placeholder="url(opcional)" defaultValue={image} label="Inserte url de imagen"/>
            <Input className="update-location__address" type="text" name="address" placeholder="Dirección" defaultValue={address} label="Dirección" />
            <Button className="button" type="submit" children="Modificar"/>
        </form>
    </div>

}

