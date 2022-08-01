import React, { useState, useEffect } from "react";
import "./FiveDays.css";

export default function FiveDays(props) {
    const [weatherDays, setWeatherDays] = useState(null);

    function locationByCityUrl(location) {
        return `https://api.openweathermap.org/geo/1.0/direct?&q=${location}&limit=5&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    }

    function fiveDaysUrl(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=038237954f4ea3f117ee36d1bb6c16e1`;
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

    return (
        <div id="FiveDays">
            <div className="container_div"></div>
        </div>
    );
}
