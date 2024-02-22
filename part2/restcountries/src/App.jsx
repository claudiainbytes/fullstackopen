import { useState, useEffect } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const countries_db_hook = () => {
     countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => console.log(error))
  }
  useEffect(countries_db_hook, [])

  const handleFilterCountry = event => setFilterCountry(event.target.value)

  const filteredCountries = (filterCountry.trim().length === 0 || filterCountry.trim() === '') ? countries : countries.filter((country) => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()) )

  return (
    <div>
      <Filter inputName={filterCountry} eventName={handleFilterCountry} />
      <Countries countries={filteredCountries} filterCountry={filterCountry} />
    </div>
  )
}

export default App