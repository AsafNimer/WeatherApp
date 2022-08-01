import React from "react";
import "./switch.css";
import cx from "classnames";

const Switch = ({ rounded = false, isToggled, onToggle }) => {
    const sliderCX = cx("slider", { rounded: rounded });

    return (
        <div className="switch_div">
            <span className="span_c">
                <strong>℃</strong>{" "}
            </span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isToggled}
                    onChange={onToggle}
                />
                <span className={sliderCX}></span>
            </label>
            <span className="span_f">
                <strong>℉</strong>{" "}
            </span>
        </div>
    );
};

export default Switch;
