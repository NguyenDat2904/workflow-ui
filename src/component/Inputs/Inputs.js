import React from 'react';
import './inputs.scss';

export function Input({ inputStyle, name, onChange, placeholder, type }) {
    let className;
    switch (inputStyle) {
        case 'filled':
            className = 'input-filled';
            break;
        case 'light':
        default:
            className = 'input-light';
            break;
    }

    return <input className={className} name={name} onChange={onChange} placeholder={placeholder} type={type} />;
}

export function Button({ children, buttonStyle, onClick, type }) {
    let className;
    switch (buttonStyle) {
        case 'light':
            className = 'button-light';
            break;
        case 'filled':
            className = 'button-filled';
            break;
        default:
            className = 'button-light';
            break;
    }

    return (
        <button className={className} type={type} onClick={onClick}>
            {children}
        </button>
    );
}
