import React from 'react';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
