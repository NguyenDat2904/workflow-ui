import React from 'react';
import classNames from 'classnames/bind';
import styles from './modalProfile.module.scss';

const cx = classNames.bind(styles);
const ModalProfile = ({ children }) => {
    return <div className={cx('modalSelect')}>{children}</div>;
};
export default ModalProfile;
