import * as Accordion from '@radix-ui/react-accordion';
import "./Forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = (new Date().getDay() + 6) % 7;
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
  return ( 
    <div className='Forecast-container'>
      <label className="forcast-title">Daily</label>
      <Accordion.Root type="single" collapsible className='forecast-details-container'>
        {data.list.slice(0, 7).map((item, idx) => (
          <Accordion.Item key={idx} value={`item-${idx}`} className='forecast-details'>
            <Accordion.Header className='forecast-details-head'>
              <Accordion.Trigger className='forecast-botton'>
                <div className="daily-item">
                  <img src={`/assest/img/icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default Forecast;
