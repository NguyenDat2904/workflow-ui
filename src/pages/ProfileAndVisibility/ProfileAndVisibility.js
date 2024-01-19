import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnyOne from '~/component/anyone/anyone';
import classNames from 'classnames/bind';
import EditField from '~/component/EditField/EditField';
import HeaderSetting from '~/layout/HeaderSetting/HeaderSetting';
import styles from './ProfileAndVisibility.module.scss';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';
import UserService from '~/services/user/userServices';
const cx = classNames.bind(styles);

const ProfileAndVisibility = () => {
   const userServices = new UserService();
   const [namefillInput, setNamefillInput] = useState('');
   const [valueInputAny, setValueInputAny] = useState('');
   const [dataUserProfile, setDataUserProfile] = useState({});
   const [formButton, setFormButton] = useState(true);
   const [valueInput, setValueInput] = useState({
      jopTitle: '',
      department: '',
      organization: '',
      location: '',
      name: '',
      gender: '',
      birthDay: '',
      desc: '',
      email: '',
      phone: '',
   });
   const user = localStorage.getItem('user');
   const parseuser = JSON.parse(user);
   const handleFormButton = () => {
      if (formButton === true) {
         setFormButton(false);
      } else {
         setFormButton(true);
      }
   };

   const callApi = async () => {
      const APIuser = await userServices.getUserProfile();
      setDataUserProfile(APIuser.data);
      setValueInput({ ...APIuser.data });
   };
   useEffect(() => {
      callApi();
   }, []);
   const handleOnchange = async (e) => {
      setNamefillInput(e.target.name);
      setValueInputAny(e.target.value);
      const { name, value } = e.target;
      setValueInput((prevValues) => ({
         ...prevValues,
         [name]: value,
      }));
      if (e.target.value === 'Male' || e.target.value === 'Female') {
         const addUserInfo = await userServices.updateUser(e.target.name, e.target.value);
         if (addUserInfo.status === 200) {
            callApi();
         }
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (
         valueInput.jopTitle !== dataUserProfile.jopTitle ||
         valueInput.department !== dataUserProfile.department ||
         valueInput.organization !== dataUserProfile.organization ||
         valueInput.location !== dataUserProfile.location ||
         valueInput.name !== dataUserProfile.name ||
         valueInput.gender !== dataUserProfile.gender ||
         valueInput.birthDay !== dataUserProfile.birthDay ||
         valueInput.desc !== dataUserProfile.desc ||
         valueInput.email !== dataUserProfile.email ||
         valueInput.phone !== dataUserProfile.phone
      ) {
         if (namefillInput !== '') {
            const addUserInfo = await userServices.updateUser(namefillInput, valueInputAny);
            if (addUserInfo.status === 200) {
               callApi();
            }
         }
      }
   };
   return (
      <>
         <HeaderSetting />
         <div className={cx('ProfileAndVisibility')}>
            <p className={cx('headerWorkOn')}>
               <Link to="/profile">
                  <span className={cx('linkProfile')}>Page profile</span>
               </Link>
               / Change
            </p>
            <h1 className={cx('titleProfileAndVisibility')}>Profile and change</h1>

            <h3 className={cx('ProfilePhotoAndHeaderImage')}>Profile photo and header image</h3>
            <ProfileHeaderImg
               dataUserProfile={dataUserProfile}
               callApi={callApi}
               heightt="112px"
               widthbagrAvatar="96px"
               heightbagrAvatar={'96px'}
            />
            <div className={cx('ProfileHeaderImg')}>
               <div className={cx('anyone')}>
                  <div className={cx('anyoneYourProfile')}>
                     <p className={cx('seeYourProfile')}>Who can see your profile photo?</p>
                     <AnyOne />
                  </div>
               </div>
            </div>
            <h3 className={cx('ProfilePhotoAndHeaderImage')}>About you</h3>
            <div className={cx('aboutYou')}>
               <div className={cx('whoSee')}>
                  <EditField
                     type="text"
                     placeholder="Your name"
                     label="Full name"
                     name="name"
                     valueInput={valueInput.name}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <div className={cx('gender')}>
                     <div className={cx('selectGenderTitle')}>
                        <span className={cx('titleGender')}>Gender</span>
                        <form className={cx('selectGender')}>
                           <select onChange={handleOnchange} className={cx('select')} name="gender" id="">
                              <option className={cx('opacity')} value={valueInput.gender}>
                                 {valueInput.gender}
                              </option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                           </select>
                        </form>
                     </div>
                  </div>
                  <EditField
                     type="date"
                     placeholder="Your birthDay"
                     label="BirthDay"
                     name="birthDay"
                     valueInput={valueInput.birthDay?.slice(0, 10)}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <EditField
                     type="text"
                     placeholder="'Your jop title'"
                     label="Jop title"
                     name="jopTitle"
                     valueInput={valueInput.jopTitle}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <EditField
                     type="text"
                     placeholder="Your department"
                     label="Department"
                     name="department"
                     valueInput={valueInput.department}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <EditField
                     type="text"
                     placeholder="Your organization"
                     label="Organization"
                     name="organization"
                     valueInput={valueInput.organization}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <EditField
                     type="text"
                     placeholder="Your location"
                     label="Location"
                     name="location"
                     valueInput={valueInput.location}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
                  <EditField
                     type="text"
                     placeholder="Your desc"
                     label="Desc"
                     name="desc"
                     valueInput={valueInput.desc}
                     formButton={formButton}
                     handleFormButton={handleFormButton}
                     handleSubmit={handleSubmit}
                     handleOnchange={handleOnchange}
                  />
               </div>
            </div>
            <h3 className={cx('ProfilePhotoAndHeaderImage')}>Contact</h3>
            <div className={cx('aboutYou')}>
               <div className={cx('whoSee')}>
                  <div className={cx('childrenAboutYouEmail')}>
                     <span className={cx('emailAddress')}>Email address</span>
                     <p className={cx('infoEmailAddress')}>{valueInput.email}</p>
                  </div>
                  <div className={cx('childrenAboutYouEmail')}>
                     <span className={cx('emailAddress')}>Phone address</span>
                     <p className={cx('infoEmailAddress')}>{valueInput.phone}</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default ProfileAndVisibility;
