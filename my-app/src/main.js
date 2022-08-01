import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import "./App.css";
import Weather from "./weather";
import ScrollButton from "./components/scrollButton";
import React, { Component } from "react";

export default class main extends Component {
    render() {
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
                <Weather />
            </BrowserRouter>
        );
    }
}
