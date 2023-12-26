import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';
import { get } from '~/ultil/hpptRequest';
import styles from './profile.module.scss';
import ViewProfile from './viewProfile/viewProfile';
const cx = classNames.bind(styles);
const Profile = () => {
   const [dataUserProfile, setDataUserProfile] = useState({});
   const user = localStorage.getItem('user');
   const parseuser = JSON.parse(user);
   const callApi = async () => {
      const APIuser = await get(`/users/${parseuser?._id}`, {
         headers: {
            authorization: `${parseuser?.accessToken}`,
            refresh_token: `${parseuser?.refreshToken}`,
         },
      });
         setDataUserProfile(APIuser.data);
   };
   useEffect(() => {
      callApi();
   }, []);
   console.log(dataUserProfile);
   return (
      <div className={cx('mainProfile')}>
         <ProfileHeaderImg
            dataUserProfile={dataUserProfile}
            callApi={callApi}
            heightt="192px"
            widthbagrAvatar="128px"
            heightbagrAvatar={'128px'}
         />
         <ViewProfile />
      </div>
   );
};

export default Profile;
