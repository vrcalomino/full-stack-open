import { useEffect, useState } from "react";
import countryService from "./services/countryService";

const apiKey = ""; // replace api key or use env variable

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [founded, setFounded] = useState([]);
  const [displayStates, setDisplayStates] = useState({});
  const [weather, setWeather] = useState(null);
  const [weatherImgUrl, setWeatherImgUrl] = useState(null);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const aux = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    setFounded(aux);
  };

  useEffect(() => {
    if (founded.length === 1) {
      const country = founded[0];
      countryWeather(country.latlng[0], country.latlng[1]);
    }
  }, [founded]);

  const handleShow = (country) => {
    const newDisplayStates = { ...displayStates };

    newDisplayStates[country.cca2] =
      newDisplayStates[country.cca2] === "block" ? "none" : "block";

    setDisplayStates(newDisplayStates);
    countryWeather(country.latlng[0], country.latlng[1]);
  };

  const countryWeather = async (lat, lon) => {
    try {
      const response = await countryService.getWeather(lat, lon, apiKey);
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      find countries{" "}
      <input
        value={search}
        onChange={handleSearch}
      />
      {search.length === 0 ? (
        <p>Too many countries, be more specific</p>
      ) : founded.length === 1 ? (
        <div>
          <h1>{founded[0].name.common}</h1>
          <p>capital {founded[0].capital[0]}</p>
          <p>area {founded[0].area}</p>
          languages:
          <ul>
            {Object.values(founded[0].languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img
            src={founded[0].flags.svg}
            alt={founded[0].flags.alt}
            width="200px"
          />
          {weather ? (
            <div>
              <h2>Weather in {founded[0].capital[0]}</h2>
              <p>temperature {Math.floor(weather.main.temp - 273.15)}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <p>wind speed: {weather.wind.speed} m/s</p>
            </div>
          ) : null}
        </div>
      ) : founded.length < 10 ? (
        founded.map((country) => (
          <div key={country.cca2}>
            {country.name.common}
            <button
              value={country}
              onClick={() => handleShow(country)}
            >
              show
            </button>
            <div
              id={country.cca2}
              style={{ display: displayStates[country.cca2] || "none" }}
            >
              <h1>{country.name.common}</h1>
              <p>capital {country.capital[0]}</p>
              <p>area {country.area}</p>
              languages:
              <ul>
                {Object.values(country.languages).map((language) => {
                  return <li key={language}>{language}</li>;
                })}
              </ul>
              <img
                src={country.flags.svg}
                alt={country.flags.alt}
                width="200px"
              />
              {weather ? (
                <div>
                  <h2>Weather in {country.capital[0]}</h2>
                  <p>temperature {Math.floor(weather.main.temp - 273.15)}°C</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                  <p>wind speed: {weather.wind.speed} m/s</p>
                </div>
              ) : null}
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
}

export default App;
