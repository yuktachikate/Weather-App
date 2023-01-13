import { createContext, useContext, useState, useEffect } from "react";
import cityData from "../data/cities_of_world.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState({
    city: "Tokyo",
    city_ascii: "Tokyo",
    lat: "35.6839",
    lng: "139.7744",
    country: "Japan",
    iso2: "JP",
    iso3: "JPN",
    admin_name: "Tōkyō",
    capital: "primary",
    population: 39105000,
    id: 1392685764,
  });
  const [weathers, setWeathers] = useState({});
  const [unit, setUnit] = useState("metric");

  const values = {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  };

  const apiKey = "4327f11f6458df3e888e99c6b054069c";
  // const apiKey = "c4d5ec23e46e618902400f2987a79a1a";

  //console.log(weathers?.current?.weather?.[0].icon);

  function getCities() {
    setCities(cityData);
  }

  const citylat = selected?.initialvalues?.[0].lat
    ? selected?.initialvalues?.[0].lat
    : selected.lat;

  const citylon = selected?.initialvalues?.[0].lng
    ? selected?.initialvalues?.[0].lng
    : selected.lng;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely,hourly&units=${unit}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/weather?lat=${citylat}&lon=${citylon}&units=${unit}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeathers(data));
    return;
  }, [selected, unit]);

  useEffect(() => {
    getCities();
    return;
  }, [unit]);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
