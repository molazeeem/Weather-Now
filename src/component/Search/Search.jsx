import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { WEATHER_API_KEY } from "../../data/weather";
import './Search.css';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const loadOptions = (inputValue) => {
    return fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        return {
          options: data.map((city) => ({
            value: `${city.lat} ${city.lon}`,
            label: `${city.name}, ${city.country}`,
          })),
        };
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        return { options: [] };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setInputValue(""); 
    onSearchChange(searchData);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    return newValue;
  };

  return (
    <div className="nav">
      <div className="logo">
        <img src="assets/img/logo.png" alt="Weather Now logo" />
        <p>Weather Now</p>
      </div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            borderRadius: "12px",
            width: "250px",
            color: "#1f1f1f",
            fontFamily: "Oxygen, sans-serif",
            marginTop:'10px',
            textAlign:'center'


          }),
          placeholder: (base) => ({
            ...base,
            fontFamily: "Oxygen, sans-serif",
            color: "#a0bfe4ff",
          }),
          input: (base) => ({
            ...base,
            fontFamily: "Oxygen, sans-serif",
            color: "#1f1f1f",
            fontWeight: "700",
          }),
          singleValue: (base) => ({
            ...base,
            fontFamily: "Oxygen, sans-serif",
            color: "#1f1f1f",
            fontWeight: "700",
          }),
          option: (base, state) => ({
            ...base,
            fontFamily: "Oxygen, sans-serif",
            backgroundColor: state.isFocused ? "#d1d1d12f" : "transparent",
            fontWeight: "700",
            borderRadius: "12px",
          }),
          menu: (base) => ({
            ...base,
            fontFamily: "Oxygen, sans-serif",
            backgroundColor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
          }),
        }}
      />
    </div>
  );
};

export default Search;