const Weather = ({ country, weather }) => {
    if(weather === null) {
        return null
    } else {
        return(
            <>
                <h2>Weather in {country.name.common}</h2>
                <p>Temperature {weather.temp} °C </p>
                <img src={weather.icon.src} alt={weather.icon.description} width="50px" height="auto"/>
                <p>Wind {weather.wind} m/s</p>
            </>
        )
    }
}

export default Weather