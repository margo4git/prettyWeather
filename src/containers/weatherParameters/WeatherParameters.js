import React from "react";
import { WeatherParameterCard } from "../../components/weatherParameterCard/WeatherParameterCard";
import { useWeather } from "../../context/weather";
import classes from "./weatherParameters.module.css";

export const WeatherParameters = () => {
  const { weatherState, separateWeatherParam, getWeatherParam, upFirst } =
    useWeather();

  const weatherParam = separateWeatherParam(
    Object.entries(getWeatherParam(weatherState))
  );

  return (
    <div className={classes.param}>
      {weatherParam.map((arrayParam, index) => {
        return (
          <div key={index}>
            {arrayParam.map((param) => {
              return (
                <WeatherParameterCard
                  key={param[0]}
                  value={param[1]}
                  param={upFirst(param[0])}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
