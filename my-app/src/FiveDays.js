import React, { useState, useEffect } from "react";
import "./FiveDays.css";

export default function FiveDays(props) {
    const [weatherDays, setWeatherDays] = useState(null);

    function locationByCityUrl(location) {
        return `https://api.openweathermap.org/geo/1.0/direct?&q=${location}&limit=5&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function fiveDaysUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&limit=7&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    useEffect(() => {
        if (!props.location) {
            return;
        }
        function getFiveDaysWeather() {
            fetch(locationByCityUrl(props.location))
                .then((res) => res.json())
                .then((dataByCity) => {
                    const fiveDays = fiveDaysUrl(
                        dataByCity[0].lat,
                        dataByCity[0].lon
                    );
                    console.log("dataByCity ", dataByCity);
                    console.log("dataByCity.lon: ", dataByCity[0].lon);
                    console.log("dataByCity.lat: ", dataByCity[0].lat);
                    console.log("five days: ", fiveDays);

                    fetch(fiveDays)
                        .then((res) => res.json())
                        .then((fiveDaysData) => {
                            console.log("fiveDaysData", fiveDaysData);
                            setWeatherDays(fiveDaysData);
                        });
                });
        }
        getFiveDaysWeather();
    }, [props.location]);

    if (!weatherDays) {
        return <div></div>;
    }

    return (
        <>
            {weatherDays && (
                <div id="FiveDays">
                    <div id="location">
                        <h2>Next days weather in:</h2>
                        <br></br>
                        <br></br>
                        <span id="city_span">
                            {" "}
                            {props.location.toUpperCase()}
                        </span>
                        <span id="country_span">
                            {weatherDays.city.country}
                        </span>
                    </div>

                    <div className="future_forecast">
                        <div className="weather_forecast" id="weather_forecast">
                            <div className="weather_forecast_item">
                                <div className="day">Tue</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherDays.list[0].weather[0].icon}@4x.png`}
                                    alt="weather_icon"
                                    className="w_icon"
                                />
                                <div className="temp">
                                    Day -{" "}
                                    {Math.round(
                                        weatherDays.list[3].main.temp_max
                                    )}{" "}
                                    c°
                                </div>
                                <div className="temp">
                                    Night -{" "}
                                    {Math.round(
                                        weatherDays.list[0].main.temp_min
                                    )}{" "}
                                    c°
                                </div>
                            </div>

                            <div className="weather_forecast_item">
                                <div className="day">Wed</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherDays.list[8].weather[0].icon}@4x.png`}
                                    alt="weather_icon"
                                    className="w_icon"
                                />
                                <div className="temp">
                                    Day -{" "}
                                    {Math.round(
                                        weatherDays.list[11].main.temp_max
                                    )}{" "}
                                    c°
                                </div>
                                <div className="temp">
                                    Night -{" "}
                                    {Math.round(
                                        weatherDays.list[8].main.temp_min
                                    )}{" "}
                                    c°
                                </div>
                            </div>
                            <div className="weather_forecast_item">
                                <div className="day">Thur</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherDays.list[15].weather[0].icon}@4x.png`}
                                    alt="weather_icon"
                                    className="w_icon"
                                />
                                <div className="temp">
                                    Day -{" "}
                                    {Math.round(
                                        weatherDays.list[18].main.temp_max
                                    )}{" "}
                                    c°
                                </div>
                                <div className="temp">
                                    Night -{" "}
                                    {Math.round(
                                        weatherDays.list[15].main.temp_min
                                    )}{" "}
                                    c°
                                </div>
                            </div>
                            <div className="weather_forecast_item">
                                <div className="day">Fri</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherDays.list[22].weather[0].icon}@4x.png`}
                                    alt="weather_icon"
                                    className="w_icon"
                                />
                                <div className="temp">
                                    Day -{" "}
                                    {Math.round(
                                        weatherDays.list[25].main.temp_max
                                    )}{" "}
                                    c°
                                </div>
                                <div className="temp">
                                    Night -{" "}
                                    {Math.round(
                                        weatherDays.list[22].main.temp_min
                                    )}{" "}
                                    c°
                                </div>
                            </div>
                            <div className="weather_forecast_item">
                                <div className="day">Sat</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherDays.list[29].weather[0].icon}@4x.png`}
                                    alt="weather_icon"
                                    className="w_icon"
                                />
                                <div className="temp">
                                    Day -{" "}
                                    {Math.round(
                                        weatherDays.list[32].main.temp_max
                                    )}{" "}
                                    c°
                                </div>
                                <div className="temp">
                                    Night -{" "}
                                    {Math.round(
                                        weatherDays.list[29].main.temp_min
                                    )}{" "}
                                    c°
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
