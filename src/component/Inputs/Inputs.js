import React from 'react';
import './inputs.scss';

export function Input({ id, inputStyle, label, name, onChange, placeholder, type }) {
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

    return (
        <div className="input-container">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                className={className}
                id={id}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
            />
        </div>
    );
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

export function Form({ children, className, onSubmit }) {
    return (
        <form className={`form ${className}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
}
