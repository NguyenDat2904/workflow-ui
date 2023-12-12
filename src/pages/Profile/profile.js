import React from 'react';
import classNames from 'classnames/bind';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';

import styles from './profile.module.scss';
import Header from '~/layout/Header/Header';
import ViewProfile from './viewProfile/viewProfile';
const cx = classNames.bind(styles);
const Profile = () => {
    return (
        <div className={cx('mainProfile')}>
            <Header />
            <ProfileHeaderImg heightt="192px" widthbagrAvatar="128px" heightbagrAvatar={'128px'} />
            <ViewProfile />
        </div>
    );
};

export default Profile;
