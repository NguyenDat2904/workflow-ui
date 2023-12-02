import React from 'react';
import './inputs.scss';

export function InputLight({ placeholder, type, name }) {
    return <input class="input-light" placeholder={placeholder} type={type} name={name} />;
}

export function InputFilled({ placeholder, type, name }) {
    return <input class="input-filled" placeholder={placeholder} type={type} name={name} />;
}

export function ButtonLight({ content, type }) {
    return (
        <button class="button-light" type={type}>
            {content}
        </button>
    );
}

export function ButtonFilled({ content, type }) {
    return (
        <button class="button-filled" type={type}>
            {content}
        </button>
    );
}
