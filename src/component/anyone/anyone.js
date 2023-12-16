import React from 'react';
import classNames from 'classnames/bind';
import styles from './anyone.module.scss';
const cx = classNames.bind(styles);

const AnyOne = () => {
    return (
        <div className={cx('buttonAnyone')}>
            <div className={cx('iconAnyone')}>
                <div className={cx('iconleftAnyone')}>
                    <span className={cx('titleAnyone')}>AnyOne</span>
                </div>
            </div>
        </div>
    );
};
export default AnyOne;
