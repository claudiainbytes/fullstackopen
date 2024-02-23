import axios from 'axios'
const baseUrlWeather = 'https://api.meteomatics.com'

const credentialsWeather = {
    username : 'freelance_estupinan_claudia',
    password : '1qv82AxMIv'
}

const getCapitalWeather = (date, parameters, location) => {
  const request = axios.get(`${baseUrlWeather}/${date}/${parameters}/${location}/json`, { auth: credentialsWeather })
  return request.then(response => response.data )
}

export default {  getCapitalWeather }