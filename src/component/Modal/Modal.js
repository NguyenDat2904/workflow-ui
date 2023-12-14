import React from 'react';
import classNames from 'classnames/bind';
import style from './Modal.module.scss';
const cx = classNames.bind(style);

function Modal({ width, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('width')} style={{ '--_1d8u6ab': width }}>
                <div className={cx('height')} style={{ 'max-height': 'calc(100vh - 200px)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
