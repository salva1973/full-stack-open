const kelvinToCelsius = kelvin => kelvin - 273.15
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const Country = ({
  commonName,
  capital,
  area,
  languages,
  flagUrl,
  weather,
}) => {
  const flagAlt = `Flag of ${commonName}`
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.main.icon}@2x.png`  

  return (
    <>
      <h1>{commonName}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flagUrl} alt={flagAlt} className='flag' />
      <h3>Weather in {capital}</h3>
      <p>{capitalize(weather.main.description)}</p>
      <img src={weatherIconUrl} alt='Weather Icon' />
      <p>Temperature: {kelvinToCelsius(weather.temp.temp).toFixed(2)} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  )
}

export default Country
