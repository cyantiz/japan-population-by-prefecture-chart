import React from "react";
import "./style.css";

interface SwitchProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch(props: SwitchProps) {
    return (
        <label className="switch-wrapper">
            <input
                type="checkbox"
                checked={props.checked}
                className="switch-value"
                onChange={props.onChange}
            />
            <span className="switch-slider" />
        </label>
    );
}
