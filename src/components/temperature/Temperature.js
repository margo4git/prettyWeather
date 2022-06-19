import React, { useEffect, useState } from "react";
import classes from "./temperature.module.css";
import { useWeather } from "../../context/weather";
import Spline from "@splinetool/react-spline";
import { Loader } from "../loader/Loader";

export const Temperature = () => {
  const { weatherState } = useWeather();
  const [isLoadingSpline, setLoadingSplineStatus] = useState(true);
  return (
    <div className={classes.block}>
      <div className={classes.splineContainer}>
        {isLoadingSpline && <Loader className={classes.loader} />}
        <Spline
          className={classes.spline}
          onLoad={() => setLoadingSplineStatus(false)}
          scene={weatherState.spline}
        />
      </div>
      <div>
        <p className={classes.temperature}>{weatherState.tempNow + "°"}</p>
        <p>{weatherState.description}</p>
      </div>
    </div>
  );
};
