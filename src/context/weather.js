import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import qs from "qs";
import { chunk, merge, pick } from "lodash";
import dayjs from "dayjs";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const data = useWeatherData();
  return (
    <WeatherContext.Provider value={data}>{children}</WeatherContext.Provider>
  );
};
export const WeatherConsumer = WeatherContext.Consumer;
export const useWeather = () => useContext(WeatherContext);

export const useWeatherData = () => {
  //initial state

  const initialStateWeather = useMemo(
    () => ({
      tempNow: null,
      main: "",
      description: "",
      high: null,
      low: null,
      wind: null,
      humidity: null,
      sunrise: null,
      sunset: null,
    }),
    []
  );

  const [isLoading, setLoading] = useState(true);
  const [weatherState, setWeatherState] = useState(initialStateWeather);
  const [timeWeatherState, setTimeWeatherState] = useState([]);
  const [cities, setCities] = useState([]);

  const upFirst = useCallback((str = "") => {
    return str[0].toUpperCase() + str.slice(1);
  }, []);

  const dailyWetherIcons = useMemo(
    () => [
      {
        mainName: ["Thunderstorm", "Drizzle", "Rain"],
        spline: "https://prod.spline.design/Glw5Fhjhs-gwzZIL/scene.splinecode",
      },
      {
        mainName: ["Snow"],
        spline: "https://prod.spline.design/MvhSyWD0VtgxiCX0/scene.splinecode",
      },
      {
        mainName: [
          "Mist",
          "Smoke",
          "Haze",
          "Dust",
          "Fog",
          "Sand",
          "Dust",
          "Ash",
          "Squall",
          "Tornado",
        ],
        spline: "https://prod.spline.design/M9I0qj81bQ4a5gcl/scene.splinecode",
      },
      {
        mainName: ["Clear"],
        type: "Sun",
        spline: "https://prod.spline.design/KuLvevecIDoc729l/scene.splinecode",
      },
      {
        mainName: ["Clear"],
        type: "Moon",
        spline: "https://prod.spline.design/B7QSm0GnwlCfAzby/scene.splinecode",
      },
      {
        mainName: ["Clouds"],
        spline: "https://prod.spline.design/GcaeT8-I3kkID07C/scene.splinecode",
      },
    ],
    []
  );

  const convertTime = useCallback((time) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  }, []);
  const getDay = useCallback((hours) => {
    if (hours >= 7 && hours <= 17) {
      return "Sun";
    } else {
      return "Moon";
    }
  }, []);
  const getDailyWeatherIcon = useCallback((main, time) => {
    console.log(main);
    const result = dailyWetherIcons.filter((dailyWeatherIcon) =>
      dailyWeatherIcon.mainName.includes(`${main}`)
    );
    console.log("rkfkff", result);
    if (main == "Clear") {
      return result.find(
        (dailyWeatherIcon) => dailyWeatherIcon.type === getDay(time)
      ).spline;
    }
    return result[0].spline;
  }, []);
  const searchWeather = useCallback(async ({ lat, lon, name } = {}) => {
    setLoading(true);
    const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?${qs.stringify(
      {
        lat: lat || 51.5074,
        lon: lon || -0.1278,

        units: "metric",
        appid: API_KEY,
      }
    )}`;
    const weatherResponse = await axios.get(urlWeather);
    console.log(weatherResponse.data);
    setWeatherState((prevWeather) => {
      const [weatherData] = weatherResponse.data.list;
      //   const period = new Date(weatherData.dt * 1000).getHours();
      const period = dayjs(weatherResponse.data.city.dt).hour();

      console.log("[!!!]", weatherData);
      console.log(period);
      const isDay = getDay(period) === "Sun";
      return {
        ...prevWeather,
        city: name || weatherResponse.data.city.name,
        tempNow: weatherData.main.temp,
        main: weatherData.weather[0].main,
        description: upFirst(
          weatherResponse.data.list[0].weather[0].description
        ),
        high: weatherData.main.temp_max + "°",
        low: weatherData.main.temp_min + "°",
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed + "mph",
        sunrise: convertTime(weatherResponse.data.city.sunrise),
        sunset: convertTime(weatherResponse.data.city.sunset),
        spline: getDailyWeatherIcon(weatherData.weather[0].main, period),
        isDay,
      };
    });

    setTimeWeatherState(weatherResponse.data.list.slice(1, 8));
    console.log(timeWeatherState);
    setLoading(false);
  }, []);
  const searchCoord = useCallback(async (city = "Lond") => {
    if (city.length < 2) {
      setCities([]);
      return;
    }
    const url = `https://api.openweathermap.org/geo/1.0/direct?${qs.stringify({
      q: city,
      limit: 45,
      appId: API_KEY,
    })}`;

    const cityResponse = await axios.get(url);
    console.log("3333", cityResponse.data);
    setCities(cityResponse.data);
  }, []);

  const getWeatherParam = useCallback((weather) => {
    return merge(
      pick(weather, ["high", "wind", "sunrise"]),
      pick(weather, ["low", "humidity", "sunset"])
    );
  }, []);

  const separateWeatherParam = useCallback((weatherParam) => {
    return chunk(weatherParam, [3]);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("dsdsd", position);
        searchWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        searchWeather();
      }
    );
  }, []);

  return {
    weatherState,
    searchWeather,
    searchCoord,
    getWeatherParam,
    separateWeatherParam,
    upFirst,
    timeWeatherState,
    cities,
    isLoading,
    setCities,
  };
};
