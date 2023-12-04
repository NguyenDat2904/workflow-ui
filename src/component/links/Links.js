import React from 'react';
import { Link } from 'react-router-dom';
import './links.scss';

export function NavigationLinks({ children, navLink }) {
    return (
        <Link className="links" to={navLink}>
            {children}
        </Link>
    );
}
