import React from "react";
import "./scrollButton.css";

export default function ScrollButton(props) {
    const scrollTo = (props) => {
        document
            .getElementById(props.scrollToId)
            .scrollIntoView({ behavior: "smooth" });
    };
    return <div className={props.classi} onClick={() => scrollTo(props)}></div>;
}
