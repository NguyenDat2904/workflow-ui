import React from 'react';
import classNames from 'classnames/bind';
import style from './DatePicker.scss';

const cx = classNames.bind(style);

export default function DatePicker({ ...props }) {
   return <input type="date" {...props} />;
}
