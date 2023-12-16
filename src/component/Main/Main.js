import React from 'react';
import classNames from 'classnames/bind';
import style from './Main.module.scss';
const cx = classNames.bind(style);
function Main({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>{children}</div>
        </div>
    );
}

export default Main;
