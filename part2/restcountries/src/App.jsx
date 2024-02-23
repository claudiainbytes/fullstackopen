import { useState, useEffect } from 'react'
import countryService from './services/country'
import weatherService from './services/weather'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = ({dbIcons}) => {

  const [countries, setCountries] = useState(null)
  const [filterCountry, setFilterCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)

  const countries_db_hook = () => {
     countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => console.log(error))
  }
  useEffect(countries_db_hook, [])

  const weather_db_hook = () => {
    if(selectedCountry){
      const date = new Date().toISOString()
      const location = selectedCountry.capitalInfo.latlng.toString()
      const parameters = `t_2m:C,wind_speed_10m:ms,weather_symbol_1h:idx` 
      weatherService
        .getCapitalWeather(date, parameters, location )
        .then( returnedWeather => {
          const objWeather = { 
            date: returnedWeather.data[0].coordinates[0].dates[0].date, 
            temp: returnedWeather.data[0].coordinates[0].dates[0].value,
            wind: returnedWeather.data[1].coordinates[0].dates[0].value,
            icon: searchIcon(returnedWeather.data[2].coordinates[0].dates[0].value)      
          }
          setCapitalWeather(objWeather)
        })
        .catch(error => console.log(error))
    } 
  }
  useEffect(weather_db_hook, [selectedCountry])

  const searchIcon = iconId => {
    const icon = dbIcons.find((icono) => ((icono.idDay === iconId.toString()) || (icono.idNight === iconId.toString())))
    return (icon.idDay === iconId) ? { src: icon.imgDay, description: icon.description } : { src: icon.imgNight, description: icon.description } 
  }

  const handleFilterCountry = event => { setFilterCountry(event.target.value)
                                         setSelectedCountry((filteredCountries.length === 1) ? filteredCountries[0] : null )
                                      }

  const filteredCountries = (filterCountry.length > 0) ? countries.filter((country) => 
                                                          country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))  :    countries

  const displayCountry = (country) => { setSelectedCountry(country); setFilterCountry('') } 
   
  if(!countries) {
    return null
  }
  return (
    <div>
      <Filter inputName={filterCountry} eventName={handleFilterCountry} />
      <Countries countries={filteredCountries} filterCountry={filterCountry} displayCountry={displayCountry} selectedCountry={selectedCountry} weather={capitalWeather}/>
    </div>
  )
}

export default App