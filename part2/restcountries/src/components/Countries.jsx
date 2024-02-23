import Country from './Country'
import DisplayButton from './DisplayButton'

const Countries = ({ countries, filterCountry, displayCountry, selectedCountry }) => {

    if(selectedCountry !== null) {
        return <Country country={selectedCountry} />
    } else if(filterCountry.length === 0) {
            return null
    } else if((filterCountry.length > 0 ) && (filterCountry.length < 2)) {
        return <p>Too many matches, specify another filter</p>
    } else if(countries.length === 1) {
        const objCountry = countries.find(country => country)
        return <Country country={objCountry} />
    } else {
        return <ul>{ countries.map((country) => <li key={country.name.common}>{ country.name.common } &nbsp; <DisplayButton displayCountry={() => displayCountry(country) }/></li> ) }</ul> 
    }
}

export default Countries