import { useState } from "react";
import "./App.css";
import Switch from "./components/switch";

export default function Weather(props) {
    const [location, setLocation] = useState(null);
    const [input, setInput] = useState("");
    const [weather, setWeather] = useState(null);
    const [pollution, setPollution] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    function locationByCityUrl(location) {
        return `http://api.openweathermap.org/geo/1.0/direct?&q=${location}&limit=5&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function pollutionUrl(lat, lon) {
        return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function weatherCelciusUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function weatherFaranheitUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}units=imperial&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    const searchLocation = (e) => {
        if (e.key === "Enter") {
            setLocation(input);
            fetch(locationByCityUrl(input))
                .then((res) => res.json())
                .then((dataByCity) => {
                    const celcius = weatherCelciusUrl(
                        dataByCity[0].lat,
                        dataByCity[0].lon
                    );

                    console.log("dataByCity ", dataByCity); // why my console log shows me berlin when i enter haifa???
                    console.log("dataByCity.lon: ", dataByCity[0].lon);
                    console.log("dataByCity.lat: ", dataByCity[0].lat);

                    fetch(celcius)
                        .then((res) => res.json())
                        .then((dataCelcius) => {
                            console.log("dataCelcius: ", dataCelcius);
                            console.log("weather.main:", dataCelcius.main.temp);
                            setWeather(dataCelcius);
                        })
                        .catch((err) => {
                            console.log(
                                "error by fetching location weatherCelciusUrl",
                                err
                            );
                        });

                    const pollutionApi = pollutionUrl(
                        dataByCity[0].lat,
                        dataByCity[0].lon
                    );

                    fetch(pollutionApi)
                        .then((res) => res.json())
                        .then((dataPollution) => {
                            console.log("Pollution data: ", dataPollution);
                            setPollution(dataPollution);
                        })
                        .catch((err) => {
                            console.log("error by fetching pollutionUrl", err);
                        });
                })
                .catch((err) => {
                    console.log("error by fetching location by city", err);
                });

            setInput("");
        }
    };

    function handleUnits() {
        fetch(locationByCityUrl(location))
            .then((res) => res.json())
            .then((dataByCity) => {
                const fahrenheitUrl = weatherFaranheitUrl(
                    dataByCity[0].lat,
                    dataByCity[0].lon
                );

                if (!isToggled) {
                    fetch(fahrenheitUrl)
                        .then((res) => res.json())
                        .then((dataFahrenheit) => {
                            console.log("dataFahrenheit: ", dataFahrenheit);
                            console.log(
                                "weather.main:",
                                dataFahrenheit.main.temp
                            );
                            setWeather(dataFahrenheit);
                        })
                        .catch((err) => {
                            console.log(
                                "error by fetching location weatherFaranheitUrl",
                                err
                            );
                        });
                }
            });
    }

    return (
        <div className="app">
            <div className="background"></div>
            <div id="earth_weather" className="search">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={searchLocation}
                    autoFocus={true}
                    placeholder="Enter Location"
                />
            </div>
            <section className="top">
                {location && (
                    <Switch
                        isToggled={isToggled}
                        onToggle={() => setIsToggled(!isToggled)}
                        onChange={() => handleUnits()}
                    />
                )}

                <div className="location">
                    <h1>
                        {location &&
                            location[0].toUpperCase() +
                                location.slice(1, location.length)}
                    </h1>
                </div>
                <div className="description">
                    {weather && <p>{weather.weather[0].description}</p>}
                    {weather && (
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather.weather[0].description}
                        />
                    )}
                </div>
                {weather && (
                    <>
                        <div className="temp">
                            <h1>
                                {weather.main
                                    ? Math.round(weather.main.temp)
                                    : null}
                                °c
                            </h1>

                            <h3>
                                ▲ Max:
                                {weather.main
                                    ? Math.round(weather.main.temp_max)
                                    : null}
                                °c
                            </h3>
                            <h3>
                                ▼ Min:{" "}
                                {weather.main
                                    ? Math.round(weather.main.temp_min)
                                    : null}
                                °c
                            </h3>
                        </div>
                    </>
                )}
            </section>
            {weather && (
                <>
                    <section className="weather_values">
                        <div className="feels">
                            <p className="bald">
                                {" "}
                                {weather.main
                                    ? Math.round(weather.main.feels_like)
                                    : null}
                                c°
                            </p>
                            <p>Feels like</p>
                        </div>
                        <div className="humidity">
                            <p>
                                {" "}
                                {weather.main ? weather.main.humidity : null}%
                            </p>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <p className="wind">
                                {weather.wind
                                    ? Math.round(weather.wind.speed * 1.94384)
                                    : null}{" "}
                                Kn<br></br>
                                Wind speed
                            </p>
                        </div>
                    </section>
                </>
            )}
            {pollution && (
                <>
                    <section className="pollution">
                        <div className="air_components">
                            <h2>Air Quality Index:</h2>
                            <br></br>
                            <br></br>
                            {(pollution.list[0].main.aqi === 1 && (
                                <span id="quality_index1">
                                    {`${pollution.list[0].main.aqi} → `}
                                    Good
                                </span>
                            )) ||
                                (pollution.list[0].main.aqi === 2 && (
                                    <span id="quality_index2">
                                        {`${pollution.list[0].main.aqi} → `}
                                        Moderate
                                    </span>
                                )) ||
                                (pollution.list[0].main.aqi === 3 && (
                                    <span id="quality_index3">
                                        {`${pollution.list[0].main.aqi} → `}
                                        Bad
                                    </span>
                                ))}
                            <br></br>
                            <br></br>
                            <h2>Concentration of pollutants in air:</h2>
                            <br></br>
                            <br></br>
                            <span className="substances">Carbon Monoxide:</span>
                            <span className="values">
                                {" "}
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[0]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances">
                                {" "}
                                Nitrogen Monoxide:
                            </span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[1]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances">
                                {" "}
                                Nitrogen Dioxide:
                            </span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[2]
                                }   `}
                            </span>{" "}
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances"> Ozone:</span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[3]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances">Sulphur Dioxide:</span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[4]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances">
                                {" "}
                                Fine Particles Matter:
                            </span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[5]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances">
                                {" "}
                                Coarse Particle Matter:
                            </span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[6]
                                }   `}
                            </span>{" "}
                            <span className="micro">µg/m2</span>
                            <br></br>
                            <br></br>
                            <span className="substances"> Ammonia</span>
                            <span className="values">
                                {`   ${
                                    Object.values(
                                        pollution.list[0].components
                                    )[7]
                                }   `}
                            </span>
                            <span className="micro">µg/m2</span>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
