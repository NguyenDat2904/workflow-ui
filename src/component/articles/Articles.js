import React from 'react';
import './articles.scss';

export function Article({ children }) {
    return <article className="article">{children}</article>;
}
