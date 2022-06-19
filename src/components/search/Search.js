import { debounce } from "lodash";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Select from "react-select/async";
import { Transition, CSSTransition } from "react-transition-group";
import { useWeather } from "../../context/weather";
import classes from "./search.module.css";

export const Search = () => {
  const { searchCoord, cities, searchWeather, weatherState } = useWeather();
  const [searchText, setSearchText] = useState("");
  const debouncedResults = useCallback(debounce(searchCoord, 500), []);

  const handleChange = useCallback(({ target: { value } }) => {
    setSearchText(value);
    debouncedResults(value);
  }, []);

  console.log("!!!", cities);
  return (
    <>
      <input
        type="text"
        value={searchText}
        placeholder={weatherState.city}
        className={`${classes.search} ${
          weatherState.isDay ? classes.searchDay : classes.searchNight
        }`}
        onChange={handleChange}
        // list="cities"
      />
      <div className={classes.searchResults}>
        {cities.map((city, index) => {
          const searchResult = `${city.name}, ${
            city.state ? `${city.state},` : ""
          } ${city.country}`;
          return (
            <span
              onClick={() => {
                setSearchText("");
                searchCoord("");
                searchWeather(city);
              }}
              key={index}
            >
              {searchResult}
            </span>
          );
        })}
      </div>
    </>
  );
};
