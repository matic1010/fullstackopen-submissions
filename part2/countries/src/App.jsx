import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );

  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Search onChange={searchChangeHandler} searchValue={searchValue} />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <CountryInfo country={filteredCountries[0]} />
        ) : (
          filteredCountries.map((country) => (
            <p key={country.cioc}>{country.name.common}</p>
          ))
        )}
      </div>
    </>
  );
};

const CountryInfo = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

const Search = ({ onChange, searchValue }) => {
  return (
    <div>
      find countries{" "}
      <input type="text" value={searchValue} onChange={onChange}></input>
    </div>
  );
};

export default App;
