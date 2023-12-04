import React from 'react';
import './inputs.scss';

export function InputLight({ placeholder, type, name }) {
    return <input className="input-light" placeholder={placeholder} type={type} name={name} />;
}

export function InputFilled({ placeholder, type, name }) {
    return <input className="input-filled" placeholder={placeholder} type={type} name={name} />;
}

export function ButtonLight({ children, type, onClick }) {
    return (
        <button className="button-light" type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export function ButtonFilled({ children, type, onClick }) {
    return (
        <button className="button-filled" type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export function Button({ children, type, onClick, buttonStyle }) {
    const className = buttonStyle === 'light' ? 'button-light' : 'button-filled';

    return (
        <button className={className} type={type} onClick={onClick}>
            {children}
        </button>
    );
}
