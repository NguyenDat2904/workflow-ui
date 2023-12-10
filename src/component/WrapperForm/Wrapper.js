import React from 'react';
import classNames from 'classnames/bind';
import style from './Wrapper.module.scss';
const cx = classNames.bind(style);
function Wrapper({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>{children}</div>
        </div>
    );
}

export default Wrapper;
