import './App.css';
import '@fontsource/oxygen';
import { useState} from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../src/data/weather";
import Forecast from "./component/Forecast/Forecast";
import Search from "./component/Search/Search";
import CurrentWeather from "./component/Current/Current";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("default.jpg");

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        const condition  = weatherResponse.weather[0].description.toLowerCase();



          const Thunderstorm = ["thunderstorm with light rain", "thunderstorm with rain", "thunderstorm with heavy rain", "light thunderstorm", "thunderstorm", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with drizzle"].map(x=>x.toLowerCase());
          const Drizzle = ["light intensity drizzle", "drizzle", "heavy intensity drizzle", "shower rain and drizzle", "heavy shower rain and drizzle"].map(x=>x.toLowerCase());
          const Rain = ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "shower rain", "heavy shower rain", "ragged shower rain"].map(x=>x.toLowerCase());
          const Snow = ["light snow", "snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "shower snow"].map(x=>x.toLowerCase());
          const Atmosphere = ["mist", "smoke", "haze", "dust", "fog", "sand", "volcanic ash", "squalls", "tornado"].map(x=>x.toLowerCase());
          const Clear = ["clear sky"].map(x=>x.toLowerCase());
          const Clouds = ["few clouds", "scattered clouds", "broken clouds", "overcast clouds"].map(x=>x.toLowerCase());

          const groups = [
            { photoUrl: "windy.jpg", values: Thunderstorm },
            { photoUrl: "Drizzle.jpg", values: Drizzle },
            { photoUrl: "rainy.jpg", values: Rain },
            { photoUrl: "snow.jpg", values: Snow },
            { photoUrl: "Atmosphere.jpg", values: Atmosphere },
            { photoUrl: "sunny.jpg", values: Clear },
            { photoUrl: "cloudy.jpg", values: Clouds },
          ];

            const matchedGroup = groups.find(group => group.values.includes(condition));
            if (matchedGroup) {
              setBackgroundImage(matchedGroup.photoUrl);
            } else {
              console.log("not found");
            }
      })
      .catch(console.log);
  };
const icons = ["☀️","💧","❄️","☂️"];
  return (
    <>

      {[...Array(40)].map((_, i) => {
        const icon = icons[i % icons.length]; // توزيع الرموز بالتساوي
        return (
          <div
            key={i}
            className="falling-icon"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 20}px`,
              color: "white"
            }}
          >
            {icon}
          </div>
        );
      })}


      <div className="background"
        style={{
          backgroundImage: `url(/assest/img/${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      ></div>
      
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </>
  );
}

export default App;