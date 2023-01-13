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

  //   const { theme, setTheme } = useTheme();
  const theme = "";

  return (
    <>
      <aside>
        <div className={`aside ${theme}`}>
          <div className="aside-container">
            <div className="aside-main">
              <h1>{selected.name}</h1>
              <h2>
                <span>{createDate(weathers?.current?.dt)}</span>
                <span>{createDay(dt)}</span>
              </h2>
              <span className="aside-degree">
                {Math.round(weathers?.current?.temp)}
                {unit === "metric" ? (
                  <span>&#8451;</span>
                ) : (
                  <span> &#8457; </span>
                )}
              </span>
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
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Weather;
