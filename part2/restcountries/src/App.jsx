import { useState, useEffect } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const countries_db_hook = () => {
     countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => console.log(error))
  }
  useEffect(countries_db_hook, [])

  const handleFilterCountry = event => { 
      setFilterCountry(event.target.value)
      setSelectedCountry(null) 
  }

  const filteredCountries = (filterCountry.trim().length === 0 || filterCountry.trim() === '') ? countries : countries.filter((country) => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()) )

  const displayCountry = (country) => { 
    setSelectedCountry(country)
    setFilterCountry('')
  } 

  return (
    <div>
      <Filter inputName={filterCountry} eventName={handleFilterCountry} />
      <Countries countries={filteredCountries} filterCountry={filterCountry} displayCountry={displayCountry} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App