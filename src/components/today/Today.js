import React, { useCallback, useEffect, useMemo } from "react";
import classes from "./today.module.css";

export const Today = () => {
  const today = useMemo(() => new Date(), []);

  const nowDate = (today) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = monthNames[today.getMonth()];
    const date = today.getDate();
    const day = days[today.getDay()];
    return `${day} ${date} ${month}`;
  };
  return <p className={classes.today}>{nowDate(today)}</p>;
};
