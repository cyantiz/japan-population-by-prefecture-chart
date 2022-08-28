import React from 'react'
import './style.css'
interface ButtonProps {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button className={"__button " + props.className}  onClick={props.onClick}>
            {props.children}
        </button>
    )
}
