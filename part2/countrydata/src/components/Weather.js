import axios from "axios"
import { useEffect, useState } from "react"

const Weather = w => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${w?.city}&appid=${api_key}&units=metric`).then(respose => {
            setWeather(respose.data)
        })
    }, [])
    return (
        <div>
            <h1>Weather in {weather?.name ?? ''}</h1>
            <p>Temperature {weather?.main.temp ?? ''} Celsius</p>
            {weather?.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img> : <p>weather icon</p>}
            <p>Wind {weather?.wind.speed ?? ''} m/s</p>
        </div>
    )
}

export default Weather