import { useState, useEffect } from 'react'

import Country from './components/Country'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [lastSearch, setLastSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [checkboxState, setCheckboxState] = useState(false)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 0) {
      countryService.getAll().then(response => {
        const simplifiedCountries = response
          .map(country => ({
            commonName: country.name.common,
            officialName: country.name.official,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flagUrl: country.flags.svg,
            capitalLatLng: country.capitalInfo.latlng,
          }))
          .sort((a, b) => {
            return a.commonName.localeCompare(b.commonName)
          })

        setCountries(simplifiedCountries)
        // console.log(simplifiedCountries)
      })
    }
  }, [countries])

  const handleSearch = (term, checkboxStatus) => {
    setSearchTerm(term)
    let selectedCountries = []
    if (countries.length !== 0 && term !== '') {
      if (term === 'all') {
        selectedCountries = countries
      } else {
        selectedCountries = countries.filter(country => {
          if (!checkboxStatus) {
            return country.commonName.toLowerCase().includes(term.toLowerCase())
          } else {
            return country.commonName.toLowerCase() === term.toLowerCase()
          }
        })
      }
      setFilteredCountries(selectedCountries)
    } else {
      setFilteredCountries(countries)
    }

    if (
      term !== '' &&
      selectedCountries.length === 1 &&
      lastSearch !== selectedCountries[0].commonName
    ) {
      setLastSearch(selectedCountries[0].commonName)
      weatherService
        .get(
          selectedCountries[0].capitalLatLng[0],
          selectedCountries[0].capitalLatLng[1]
        )
        .then(response => {
          setWeather({
            main: response.weather[0],
            temp: response.main,
            wind: response.wind,
          })
        })
    } else if (selectedCountries.length > 1) {
      // to optimize the calls to the API
      setWeather(null)
      setLastSearch('')
    }
  }

  const handleSearchChange = event => {
    handleSearch(event.target.value, checkboxState)
  }

  const handleCheckboxChange = () => {
    const checkboxStatus = !checkboxState
    setCheckboxState(checkboxStatus)
    handleSearch(searchTerm, checkboxStatus)
  }

  return (
    <>
      <label htmlFor='search'>find countries </label>
      <input
        type='text'
        id='search'
        name='search'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <input
        type='checkbox'
        id='exact'
        name='exact'
        value={checkboxState}
        onChange={handleCheckboxChange}
      />
      <label htmlFor='exact'> Exact match</label>
      {searchTerm !== '' && filteredCountries.length > 1 && (
        <>
          <br />
          {filteredCountries.map(country => (
            <div key={country.commonName}>
              {country.commonName}{' '}
              <button
                onClick={() => handleSearch(country.commonName, checkboxState)}
              >
                show
              </button>
            </div>
          ))}
          <h3>{filteredCountries.length} countries</h3>
        </>
      )}

      {searchTerm !== '' && filteredCountries.length === 1 && weather && (
        <Country
          commonName={filteredCountries[0].commonName}
          capital={filteredCountries[0].capital}
          area={filteredCountries[0].area}
          languages={filteredCountries[0].languages}
          flagUrl={filteredCountries[0].flagUrl}
          weather={weather}
        />
      )}
    </>
  )
}

export default App
