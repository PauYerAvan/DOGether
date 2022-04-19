import './SearchLocations.sass'
import { SearchIcon, CleanSearchIcon, Input, Select, Button } from '.'
import { data } from 'commons'
const { locationTypes, locationCities } = data

export function SearchLocations({onSearchLocations, onReset}) {

    const search = event => {
        event.preventDefault()

        const { target: { query: { value: query }, type: { value: _type }, city: { value: _city } } } = event

        const type = _type ? _type : ''
        const city = _city ? _city : ''

        onSearchLocations({query, type, city})
    }


    return <div className="search">
        <form className="search__form" onSubmit={search}>
            <div className="search__form-input">
                <Input className="input-search" type="text" name="query" placeholder="Busca" />
                <Button type="submit"><SearchIcon className="icon-search"/></Button>
                <Button type="reset" onClick={onReset}><CleanSearchIcon className="icon-clean"/></Button>
            </div>
            <div className="search__form-select">
                <Select className="select-type" options={locationTypes} name="type" placeholder="Todos" label= "Tipo" />
                <Select className="select-city" options={locationCities} name="city" placeholder="Todas" label= "Ciudad" />
            </div>
        </form>
    </div>

}



