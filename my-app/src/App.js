import { useState } from "react";
import "./App.css";

export default function App() {
    const [location, setLocation] = useState("Berlin");
    const [input, setInput] = useState("");
    const [weather, setWeather] = useState(null);

    const locationByCityUrl = `http://api.openweathermap.org/geo/1.0/direct?&q=${location}&limit=5&appid=038237954f4ea3f117ee36d1bb6c16e1`;

    function pollutionUrl(lat, lon) {
        return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function weatherCelciusUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function weatherFaranheitUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    console.log("weatherFaranheitUrl: ", weatherFaranheitUrl(52.52, 13.4));
    console.log("pollutionUrl: ", pollutionUrl(52.52, 13.4));

    const searchLocation = (e) => {
        // console.log("e.key", e.key, "value", e.target.value);
        if (e.key === "Enter") {
            fetch(locationByCityUrl)
                .then((res) => res.json())
                .then((data) => {
                    // console.log("data ", data);
                    // console.log("data.lon: ", data[0].lon);
                    // console.log("data.lat: ", data[0].lat);
                    const nestedFetchUrl = weatherCelciusUrl(
                        data[0].lat,
                        data[0].lon
                    );
                    setLocation(input);

                    fetch(nestedFetchUrl)
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("data2: ", data);
                            console.log("weather.main:", data.main.temp);
                            setWeather(data);
                        })
                        .catch((err) => {
                            console.log(
                                "error by fetching location weatherCelciusUrl",
                                err
                            );
                        });
                })
                .catch((err) => {
                    console.log("error by fetching location by city", err);
                });
            setLocation("");
        }
    };

    return (
        <div className="app">
            <h1 className="page_title">getWeather.</h1>
            <div className="search">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        {/* <h1>{`${location[0].toUpperCase()}${location.slice(
                            1,
                            location.length
                        )}`}</h1> */}
                        <h1>
                            {location &&
                                location[0].toUpperCase() +
                                    location.slice(1, location.length)}
                        </h1>
                    </div>
                    {weather && (
                        <>
                            <div className="temp">
                                <h1>
                                    {weather.main
                                        ? Math.round(weather.main.temp)
                                        : null}
                                    C°
                                </h1>
                                <h3>
                                    Max:{" "}
                                    {weather.main
                                        ? Math.round(weather.main.temp_max)
                                        : null}
                                    C°
                                </h3>
                                <h3>
                                    Min:{" "}
                                    {weather.main
                                        ? Math.round(weather.main.temp_min)
                                        : null}
                                    C°{" "}
                                </h3>
                            </div>
                            <div className="description">
                                <p>{weather.weather[0].description}</p>
                            </div>
                        </>
                    )}
                </div>

                {weather && (
                    <>
                        <div className="bottom">
                            <div className="feels">
                                <p className="bald">
                                    {" "}
                                    {weather.main
                                        ? Math.round(weather.main.feels_like)
                                        : null}
                                    C°
                                </p>
                                <p>Feels like</p>
                            </div>
                            <div className="humidity">
                                <p className="bald">
                                    {" "}
                                    {weather.main
                                        ? weather.main.humidity
                                        : null}
                                    %
                                </p>
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                <p className="wind">
                                    {weather.wind
                                        ? Math.round(weather.wind.speed)
                                        : null}{" "}
                                    m/sec<br></br>
                                    Wind speed
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
