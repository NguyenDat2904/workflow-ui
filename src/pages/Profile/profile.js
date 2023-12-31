import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';
import styles from './profile.module.scss';
import ViewProfile from './viewProfile/viewProfile';
import UserService from '~/services/user/userServices';

const cx = classNames.bind(styles);
const Profile = () => {
   const userServices = new UserService();
   const [dataUserProfile, setDataUserProfile] = useState({});
   const callApi = async () => {
      const APIuser = await userServices.getUserProfile(false);
      setDataUserProfile(APIuser.data);
   };
   useEffect(() => {
      callApi();
   }, []);
   return (
      <div className={cx('mainProfile')}>
         <ProfileHeaderImg
            dataUserProfile={dataUserProfile}
            callApi={callApi}
            heightt="192px"
            widthbagrAvatar="128px"
            heightbagrAvatar={'128px'}
         />
         <ViewProfile dataUserProfile={dataUserProfile} />
      </div>
   );
};

export default Profile;
