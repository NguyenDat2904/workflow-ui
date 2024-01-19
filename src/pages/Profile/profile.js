import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';
import styles from './profile.module.scss';
import ViewProfile from './viewProfile/viewProfile';
import UserService from '~/services/user/userServices';
import { UserContext } from '~/contexts/user/userContext';

const cx = classNames.bind(styles);
const Profile = () => {
   const { dataUserProfile, getUser } = useContext(UserContext);

   useEffect(() => {
      getUser();
   }, []);
   return (
      <div className={cx('mainProfile')}>
         <ProfileHeaderImg
            dataUserProfile={dataUserProfile}
            callApi={getUser}
            heightt="192px"
            widthbagrAvatar="128px"
            heightbagrAvatar={'128px'}
         />
         <ViewProfile dataUserProfile={dataUserProfile} />
      </div>
   );
};

export default Profile;
