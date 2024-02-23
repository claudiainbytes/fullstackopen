import Country from './Country'
import DisplayButton from './DisplayButton'

const Countries = ({ countries, filterCountry, displayCountry, selectedCountry, weather }) => {
    if(selectedCountry !== null) {
        return <Country country={selectedCountry} weather={weather} />
    } else if(filterCountry.length === 0) {
            return null
    } else if((filterCountry.length > 0 ) && (filterCountry.length < 2)) {
        return <p>Too many matches, specify another filter</p>
    } else {
        return <ul>{ countries.map((country) => <li key={country.name.common}>{ country.name.common } &nbsp; <DisplayButton displayCountry={() => displayCountry(country) }/></li> ) }</ul> 
    }
}

export default Countries