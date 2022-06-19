import React from "react";
import { WeatherTimeCard } from "../../components/weatherTimeCard/WeatherTimeCard";
import { useWeather } from "../../context/weather";
import classes from "./weatherTime.module.css";

export const WeatherTime = () => {
  const { timeWeatherState } = useWeather();
  return (
    <div className={classes.anotherTime}>
      {timeWeatherState.map((wetherToday, index) => {
        return (
          <WeatherTimeCard
            key={index}
            time={wetherToday.dt_txt.split(" ")[1].slice(0, 5)}
            icon={`https://openweathermap.org/img/wn/${wetherToday.weather[0].icon}@2x.png`}
            temp={wetherToday.main.temp + "°"}
          />
        );
      })}
    </div>
  );
};
