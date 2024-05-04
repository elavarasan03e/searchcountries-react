import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [country, setCountry] = useState([]);
  const [searchCountry,setSearchCountry] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("https://restcountries.com/v3.1/all")
        .then(res=>res.json())
        .then(data=>setCountry(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange=(e)=>{
    setSearchCountry(e.target.value);
    console.log(searchCountry);
  }

  const filteredCountries = country.filter(country => {
    return country.name.common.toLowerCase().includes(searchCountry.toLowerCase());
  });

  return (
    <div className="App">
      <div class="search"> 
      <input type='text' placeholder="Search for Countries" value={searchCountry} onChange={handleChange} />
      </div>

      <div className="country-container">
      
      {filteredCountries.map((country) => {
          return (
            <div key={country.cca3} className="countryCard">
              <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
              <h2>{country.name.common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
