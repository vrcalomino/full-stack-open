import { useEffect, useState } from "react";
import countryService from "./services/countryService";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [founded, setFounded] = useState([]);

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
    console.log("Founded: ", founded);
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
        </div>
      ) : founded.length < 10 ? (
        founded.map((country) => (
          <p key={country.cca2}>{country.name.common}</p>
        ))
      ) : null}
    </div>
  );
}

export default App;
