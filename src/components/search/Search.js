import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiUrl, GeoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue) => {
        return fetch(`${GeoApiUrl}?namePrefix=${inputValue}`, GeoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`
                        }
                    })
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}

        />
    )
}

export default Search