import React from 'react';

export function Table({ Children }) {
    return (
        <table className="table">
            <Children />
        </table>
    );
}
