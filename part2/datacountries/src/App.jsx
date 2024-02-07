import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import axios from 'axios'

const SearchBar = ( {search, onSearchChange} ) => {
  return (
    <div>
      find countries: 
      <input
        type='text'
        id='search'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

const DisplayCountries = ( {countries, handleClick, visibleID} ) => {
  if (countries.length < 11 && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => 
          <p key={country.name.common}>
            {country.name.common} 

            <button onClick={() => handleClick(country.name.common)}>show</button>

            {visibleID === country.name.common && (
              <BasicCountryData country={country}/>
            )}
          </p>
        )}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <BasicCountryData country={countries[0]} />
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }  
}

const BasicCountryData = ( {country} ) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      {Object.values(country.languages).map((language) => 
        <li key={language}>{language}</li>
      )}
      <img src={country.flags.png}/>
    </div>
  )
}



function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [visibleID, setVisibleID] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const searchWord = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  const handleClick = (ID) => {
    setVisibleID(ID) 
  }

  return (
    <div>
      <SearchBar searchWord={search} onSearchChange={setSearch}/>
      <DisplayCountries countries={searchWord} handleClick={handleClick} visibleID={visibleID}/>
    </div>
  )
}

export default App

/*
asbasdfgsdfgsdf
*/
