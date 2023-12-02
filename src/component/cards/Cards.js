import React from 'react';
import './cards.scss';

export function Card({ children, className }) {
    return <div className={`card ${className}`}>{children}</div>;
}
