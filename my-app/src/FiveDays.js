// import React, { useState } from "react";
import "./FiveDays.css";

export default function FiveDays() {
    // const [weatherDays, setWeatherDays] = useState("");

    // function locationByCityUrl(location) {
    //     return `http://api.openweathermap.org/geo/1.0/direct?&q=${location}&limit=5&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    // }

    // function fiveDaysUrl(lat, lon) {
    //     return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=038237954f4ea3f117ee36d1bb6c16e1`;
    // }

    // function getFiveDaysWeather() {
    //     fetch(locationByCityUrl(input))
    //         .then((res) => res.json())
    //         .then((dataByCity) => {
    //             const fiveDays = fiveDaysUrl(
    //                 dataByCity[0].lat,
    //                 dataByCity[0].lon
    //             );
    //             console.log("dataByCity ", dataByCity);
    //             console.log("dataByCity.lon: ", dataByCity[0].lon);
    //             console.log("dataByCity.lat: ", dataByCity[0].lat);

    //             fetch(fiveDays).then((res)=>res.json).then((fiveDaysData)=>{
    //                 console.log("fiveDaysData", fiveDaysData);
    //                 setWeatherDays(fiveDaysData);
    //             })

    //         });
    // }

    return (
        <div id="FiveDays">
            <div className="container_div"></div>
        </div>
    );
}
