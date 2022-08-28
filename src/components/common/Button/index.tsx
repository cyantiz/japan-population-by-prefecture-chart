import React from 'react'
import './style.css'
interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

//make a button same as ant design
export default function Button(props: ButtonProps) {
    return (
        <button className="custom-button" onClick={props.onClick}>
            {props.children}
        </button>
    )
}
