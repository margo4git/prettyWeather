import React from "react";
import classes from "./weatherParameterCard.module.css";

export const WeatherParameterCard = ({ value = "23", param = "High" }) => {
  return (
    <div className={classes.parameters}>
      <p>{value}</p>
      <p className={classes.name}>{param}</p>
    </div>
  );
};
