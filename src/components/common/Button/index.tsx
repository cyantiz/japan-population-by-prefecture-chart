import React from 'react'
import './style.css'
interface ButtonProps {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
}

//make a button same as ant design
export default function Button(props: ButtonProps) {
    return (
        <button className={"__button " + props.className}  onClick={props.onClick}>
            {props.children}
        </button>
    )
}
