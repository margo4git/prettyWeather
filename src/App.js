import classes from "./App.module.css";
import { Temperature } from "./components/temperature/Temperature";
import { WeatherConsumer, WeatherProvider } from "./context/weather";
import { Search } from "./components/search/Search";
import { Today } from "./components/today/Today";
import { WeatherParameters } from "./containers/weatherParameters/WeatherParameters";
import { WeatherTime } from "./containers/weatherTime/WeatherTime";
import { Loader } from "./components/loader/Loader";

function App() {
  return (
    <WeatherProvider>
      <WeatherConsumer>
        {({ isLoading, setCities, weatherState }) => {
          return (
            <div
              className={`${classes.appContainter} ${
                weatherState.isDay ? classes.appDay : classes.appNight
              }`}
              onClick={() => setCities([])}
            >
              <div className={classes.main}>
                <div className={classes.searchContainer}>
                  <Search />
                  <Today />
                </div>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div className={classes.weather}>
                      <Temperature />
                      <div className={classes.vl}></div>
                      <WeatherParameters />
                    </div>
                    <WeatherTime />
                  </>
                )}
              </div>
            </div>
          );
        }}
      </WeatherConsumer>
    </WeatherProvider>
  );
}

export default App;
