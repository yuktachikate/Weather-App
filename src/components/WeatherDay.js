import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const WeatherDay = (props) => {
  const [weatherData, setWeatherData] = useState({});

  const location = useLocation();

  const { lat, lon, date, city, day, imgSource, minTemp, maxTemp, desc } =
    location.state;
  const API_KEY = "c4d5ec23e46e618902400f2987a79a1a";

  function createDate(dt) {
    const newDate = new Date(dt);
    return newDate.toDateString().slice(3);
  }

  console.log("lat", lat);
  console.log("lon", lon);
  console.log("date", date);

  console.log(weatherData);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
    return;
  }, []);

  const theme = "";

  return (
    <div class="weather-container">
      <div className={`weather ${theme}`}>
        <div className="aside-container">
          <div className="weather-main">
            <div className="back">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Back to Home
              </Link>
            </div>

            <h1>{city}</h1>
            <h2>
              <span>{date}</span>
              <span>{day}</span>
            </h2>
            <div className="weather-detail">
              <img src={imgSource} />
              <span>{desc}</span>
            </div>

            {/* <div className="weather-min-max">
              <div>
                <span>Min Temp</span> : {minTemp}
              </div>
              <div>
                <span>Max Temp</span> : {maxTemp}
              </div>
            </div> */}

            <h3 style={{ marginTop: "30px", marginBottom: "30px" }}>
              Weather Forecast (Every 3 hours)
            </h3>

            <table className="weather-table">
              <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
              </tr>
              {weatherData &&
                weatherData.list &&
                weatherData.list.length > 0 &&
                // weatherData.list.forEach((weather) => {
                //   // const date = weather.dt_txt.split(" ")[0];
                //   // console.log("date : ", date);

                //   const weatherDate = createDate(weather.dt);
                //   const weatherTime = weather.dt_txt.split(" ")[1];
                //   console.log("weatherDate : ", weatherDate);

                //   if (weatherDate === date) {
                //     console.log(" weatherDate and date matched");
                //     return (
                //       <div>
                //         <h4>{weatherTime}</h4> : <h4>{weather.main.temp}</h4>
                //       </div>
                //     );
                //   }
                // })}
                weatherData.list
                  .filter((wd) => createDate(wd.dt_txt.split(" ")[0]) === date)
                  .map((weather) => {
                    // const date = weather.dt_txt.split(" ")[0];
                    // console.log("date : ", date);

                    const weatherDate = weather.dt_txt.split(" ")[0];
                    const weatherTime = weather.dt_txt
                      .split(" ")[1]
                      .substr(0, 5);
                    const formattedWeatherDate = new Date(weatherDate)
                      .toDateString()
                      .slice(3);
                    // return newDate.toDateString().slice(3);
                    // console.log("weatherDate : ", weatherDate);
                    console.log(
                      "formattedWeatherDate : ",
                      formattedWeatherDate
                    );

                    // if (weatherDate === date) {
                    //   console.log(" weatherDate and date matched");
                    return (
                      <tr>
                        <td>{weatherTime}</td>
                        <td>{weather.main.temp}</td>
                      </tr>
                    );
                    // }
                  })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDay;
