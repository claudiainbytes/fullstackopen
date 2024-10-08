import Weather from "./Weather"
const Country = ({ country, weather }) => <>
                                    <h1>{country.name.common}</h1>
                                    <p>capital {country.capital}</p>
                                    <p>area {country.area}</p>
                                    <p><b>languages:</b></p>
                                    <ul>{ Object.values(country.languages).map((language) => <li key={language} > {language} </li> )}</ul>
                                    <img src={country.flags.png} alt={country.flags.alt} width="250px" height="auto"/>
                                    <Weather country={country} weather={weather} />
                                </>
export default Country