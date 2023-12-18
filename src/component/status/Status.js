import React from 'react';
import classNames from 'classnames/bind';
import styles from './Status.scss';
const cx = classNames.bind(styles);

export default function Status({ children, status }) {
    return <p className={`${cx('status')} ${status}`}>{children}</p>;
}
