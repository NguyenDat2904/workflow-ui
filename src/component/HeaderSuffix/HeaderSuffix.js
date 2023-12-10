import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderSuffix.module.scss';
import { GreenTickIcon, LogoIcon } from '../icon/icon';
const cx = classNames.bind(style);

function HeaderSuffix({ title, icon }) {
    return (
        <div className={cx('header')}>
            <span className={cx('header-logo')}>
                <LogoIcon nameCss={cx('logo')} />
            </span>
            <div className={cx('header-suffix')}>
                <div className={cx('suffix')}>
                    <div className={cx('title')}>
                        <h5>{title}</h5>
                        {icon && (
                            <span>
                                <GreenTickIcon nameCss={cx('tick')} />
                            </span>
                        )}
                    </div>
                    {icon && 'Finish setting up your account'}
                </div>
            </div>
        </div>
    );
}

export default HeaderSuffix;
