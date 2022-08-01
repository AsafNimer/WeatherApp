import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Weather from "./weather";
import ScrollButton from "./components/scrollButton";
import FiveDays from "./FiveDays";
import React, { useState } from "react";

export default function Main() {
    const [location, setLocation] = useState(null);
    const [weatherDays, setWeatherDays] = useState("");

    return (
        <BrowserRouter>
            <div className="main">
                <div className="welcome_page">
                    <h1 className="home_title">getWeather.</h1>
                    <ScrollButton
                        classi="scroll_button"
                        scrollToId="earth_weather"
                    />
                </div>
            </div>
            <Weather setLocation={setLocation} />
            <FiveDays location={location} />
        </BrowserRouter>
    );
}
