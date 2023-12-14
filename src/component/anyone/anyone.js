import React from 'react';
import classNames from 'classnames/bind';
import { SuccessIcon, DownIcon } from '../icon/icon';
import styles from './anyone.module.scss';
const cx = classNames.bind(styles);

const AnyOne = () => {
    return (
        <div className={cx('buttonAnyone')}>
            <div className={cx('iconAnyone')}>
                <div className={cx('iconleftAnyone')}>
                    <SuccessIcon />
                    <span className={cx('titleAnyone')}>AnyOne</span>
                </div>
                <div className={cx('iconRightAnyone')}>
                    <DownIcon />
                </div>
            </div>
        </div>
    );
};
export default AnyOne;
