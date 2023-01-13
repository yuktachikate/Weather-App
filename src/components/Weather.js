import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../context/ThemeContext";
import { Navigate, Link } from "react-router-dom";

function Weather() {
  const {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  } = useWeather();

  console.log("selected: ", selected);

  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    const newValue = e.target.value.split(",");
    setSelected({
      city: newValue[0],
      city_ascii: newValue[1],
      lat: newValue[2],
      lng: newValue[3],
      country: newValue[4],
      iso2: newValue[5],
      iso3: newValue[6],
      admin_name: newValue[7],
      capital: newValue[8],
      population: newValue[9],
      id: newValue[10],
    });
  };
  const handleSwitch = () => {
    setUnit(unit == "metric" ? "imperial" : "metric");
  };
  const dt = weathers?.current?.dt;

  function createDate(dt) {
    const newDate = new Date(dt * 1000);
    return newDate.toDateString().slice(3);
  }

  function createDay(dt, type) {
    const day = new Date(dt * 1000);
    if (type === "long") {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options);
    } else {
      return day.toLocaleString("en-us", { weekday: "long" });
    }
  }
  return (
    <>
      <aside>
        <div className={`aside ${theme}`}>
          <div className="aside-container">
            <div className="aside-header">
              <select onChange={handleChange}>
                {cities.slice(0, 7).map((city) => (
                  <option
                    key={city.id}
                    value={[
                      city.id,
                      city.city_ascii,
                      city.lat,
                      city.lng,
                      city.population,
                      city.capital,
                    ]}
                  >
                    {city.city_ascii}
                  </option>
                ))}
              </select>
            </div>
            <div className="aside-main">
              <h1>{selected.city_ascii}</h1>
              <h2>
                <span>{createDate(weathers?.current?.dt)}</span>
                <span>{createDay(dt)}</span>
              </h2>
              {weathers?.current?.weather?.[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
                />
              )}
              <span className="aside-degree">
                {Math.round(weathers?.current?.temp)}
                {unit === "metric" ? (
                  <span>&#8451;</span>
                ) : (
                  <span> &#8457; </span>
                )}
              </span>
              {/* <div className="aside-main-item">
                <div>
                  Feels Like
                  <span className="material-symbols-rounded">
                    device_thermostat
                  </span>
                </div>
                <span>
                  {Math.round(weathers?.current?.feels_like)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div> */}
              <div className="aside-main-item">
                <div>
                  Max Temp
                  <span className="material-symbols-rounded">light_mode</span>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[0]?.temp?.max)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  Min Temp
                  <span className="material-symbols-rounded">bedtime</span>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[0]?.temp?.min)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </span>
              </div>
              {/* <div className="aside-main-item">
                <div>
                  Humidity
                  <ion-icon name="water"></ion-icon>
                </div>
                <span>{weathers?.current?.humidity}%</span>
              </div>
              <div className="aside-main-item">
                <div>
                  Wind
                  <span className="material-symbols-rounded">air</span>
                </div>
                <span>{weathers?.current?.wind_speed}</span>
              </div> */}
            </div>
            <div className="aside-footer">
              <span
                className="mode"
                onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}
              >
                {theme === "Dark" ? (
                  <ion-icon name="sunny"></ion-icon>
                ) : (
                  <ion-icon name="moon"></ion-icon>
                )}
              </span>
              <div className="unity">
                <div>C</div>
                <div>
                  <label className="switch">
                    <input type="checkbox" onChange={handleSwitch} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div>F</div>
              </div>
              <a
                href="https://github.com/xpadyal/INFO6150_Web_Design_and_User_Experience_2022.git"
                target="_blank"
                className={`logo-github ${theme}`}
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </aside>
      <section>
        <div className="section-container">
          {weathers?.daily?.slice(0, 5).map((dayily, i) => (
            <div key={i} className={`grid-item ${theme}`}>
              <div className="grid-item-header">
                <Link
                  to={`/${createDay(dayily?.dt)}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  state={{
                    lat: weathers.lat,
                    lon: weathers.lon,
                    date: createDate(dayily?.dt),
                    day: createDay(dayily?.dt),
                    city: selected.city_ascii,
                    imgSource: `http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`,
                    minTemp: dayily?.temp?.min,
                    maxTemp: dayily?.temp?.max,
                    desc: dayily?.weather?.[0]?.description,
                  }}
                >
                  {createDate(dayily?.dt)}
                </Link>
              </div>
              <div className="grid-item-container">
                <img
                  src={`http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`}
                />
                <span>{createDay(dayily?.dt)}</span>
                <span>{dayily?.weather?.[0]?.description}</span>
              </div>
              <div className="grid-item-footer">
                <div>
                  Min: {Math.round(dayily?.temp?.min)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </div>
                <div>
                  Max: {Math.round(dayily?.temp?.max)}
                  {unit === "metric" ? (
                    <span>&#8451;</span>
                  ) : (
                    <span> &#8457; </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Weather;
