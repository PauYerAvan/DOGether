import './SearchLocations.sass'
import { useState } from 'react'
import { ListSearchResults } from '.'
import { SearchIcon, CleanSearchIcon, Input, Select, Button } from '.'
import { data } from 'commons'
const { locationTypes, locationCities } = data

export function SearchLocations({onLocationCard}) {
    const [query, setQuery] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')


    const search = event => {
        event.preventDefault()

        const query = event.target.query.value
        const type = event.target.type.value
        const city = event.target.city.value

        setQuery(query)
        setType(type)
        setCity(city)
    }

    const cleanSearch = (event) => {
        event.preventDefault()

        setQuery('')
        setType('')
        setCity('')
    } 


    return <div className="search">
        <form className="search__form" onSubmit={search}>
            <Input className="search__query-input" type="text" name="query" placeholder="Busca" defaultValue={query} />
            <Select className="search__type-input" options={locationTypes} selected={type} name="type" placeholder="Todos" label= "Tipo" />
            <Select className="search__city-input" options={locationCities} selected={city} name="city" placeholder="Todas" label= "Ciudad" />
            <Button type="Reset" onClick={cleanSearch}><CleanSearchIcon/></Button>
            <Button type="submit"><SearchIcon/></Button>
        </form>
            <ListSearchResults query={query} type={type} city={city} onLocationCard={onLocationCard} />
    </div>

}



