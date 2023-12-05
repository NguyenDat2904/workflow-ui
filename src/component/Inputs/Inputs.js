import React from 'react';
import './inputs.scss';

export function InputLight({ placeholder, type, name }) {
    return <input class="input-light" placeholder={placeholder} type={type} name={name} />;
}

export function InputFilled({ placeholder, type, name }) {
    return <input class="input-filled" placeholder={placeholder} type={type} name={name} />;
}

export function ButtonLight({ children, type }) {
    return (
        <button class="button-light" type={type}>
            {children}
        </button>
    );
}

export function ButtonFilled({ children, type }) {
    return (
        <button class="button-filled" type={type}>
            {children}
        </button>
    );
}
