import React from "react";
import classes from "./weatherTimeCard.module.css";

export const WeatherTimeCard = ({ time = "", icon = "", temp = "" }) => {
  return (
    <div className={classes.weather}>
      <p>{time}</p>
      <img src={icon} />
      <p>{temp}</p>
    </div>
  );
};
