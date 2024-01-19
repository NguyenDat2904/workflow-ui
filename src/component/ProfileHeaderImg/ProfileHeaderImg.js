import React, { useEffect, useState, useRef } from 'react';
import ModalSelectImg from '~/pages/Profile/modalSelectImg/modalSelectImg';
import AddProfilePhoto from '~/pages/Profile/addProfilePhoto/addProfilePhoto';
import classNames from 'classnames/bind';
import styles from './ProfileHeaderImg.module.scss';
import UserService from '~/services/user/userServices';
import Modal from '../Modal/Modal';
import { LoadingIcon } from '../icon/icon';
const cx = classNames.bind(styles);

const ProfileHeaderImg = ({ dataUserProfile, callApi, heightt, widthbagrAvatar, heightbagrAvatar }) => {
   const userServices = new UserService();
   const [isToggleImgAvatar, setIsToggleImgAvatar] = useState(false);
   const [isToggleImgColor, setIsToggleImgColor] = useState(false);

   const [imgAvatar, setImgAvatar] = useState(false);
   const [imgCover, setImgCover] = useState(false);
   const [loadingImgCover, setLoadingImgCover] = useState(false);

   const handleOnchange = async (e) => {
      setLoadingImgCover(true);
      const formData = new FormData();
      formData.append('imgCover', e.target.files[0]);
      const upload = await userServices.uploadImg(formData);
      if (upload.status === 200) {
         await callApi();
      }
      setLoadingImgCover(false);
   };
   return (
      <div className={cx('mainProfile')}>
         <div className={cx('profileUser')}>
            <div style={{ height: heightt }} className={cx('backgroundImgUser')}>
               <div className={cx('bgrimg', imgCover && 'bgrHover')}>
                  {loadingImgCover ? (
                     <div>
                        <LoadingIcon />
                     </div>
                  ) : (
                     <>
                        <img
                           className={cx('imgCover')}
                           name="imgCover"
                           src={
                              dataUserProfile?.imgCover
                                 ? dataUserProfile?.imgCover
                                 : 'https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/2.svg'
                           }
                           alt=""
                        />
                        <div className={cx('addImg')}>
                           <form action="">
                              <input
                                 onChange={handleOnchange}
                                 className={cx('inputUploadFile')}
                                 type="file"
                                 name="imgCover"
                                 id="img_cover"
                              />
                              <div style={{ textAlign: 'center' }} onClick={() => setImgCover(true)}>
                                 <span>
                                    <svg viewBox="0 0 24 24" role="presentation">
                                       <path
                                          d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0119.005 21H4.995A1.995 1.995 0 013 19.005V4.995zM10.5 16.5L9 15l-3 3h12v-2.7L15 12l-4.5 4.5zM8 10a2 2 0 100-4 2 2 0 000 4z"
                                          fill="currentColor"
                                          fillRule="evenodd"
                                       />
                                    </svg>
                                 </span>
                                 <h4>Update your header image</h4>
                              </div>
                              <Modal onClose={() => setImgCover(false)} isOpen={imgCover} relative width="138px">
                                 <div
                                    className={cx(imgCover ? 'labelUploadImg' : 'notShownUploadImg')}
                                    onClick={() => setImgCover(false)}
                                 >
                                    <label htmlFor="img_cover">
                                       <h4>Upload an image</h4>
                                    </label>
                                 </div>
                              </Modal>
                           </form>
                        </div>
                     </>
                  )}
               </div>
               <div className={cx('avatarUser')}>
                  <div style={{ width: widthbagrAvatar, height: heightbagrAvatar }} className={cx('bagrAvatar')}>
                     <div className={cx('avatar')}>
                        {dataUserProfile?.img ? (
                           <img className={cx('avatarImg')} src={dataUserProfile.img} alt="" />
                        ) : dataUserProfile?.backgroundProfile ? (
                           <div
                              style={{ backgroundColor: dataUserProfile.backgroundProfile }}
                              className={cx('avatarBackground')}
                           >
                              <span className={cx('textAvatarBackground')}>
                                 {dataUserProfile.textInBackgroundProfile}
                              </span>
                           </div>
                        ) : (
                           <img
                              className={cx('avatarImg')}
                              src="https://thespiritofsaigon.net/wp-content/uploads/2022/10/avatar-vo-danh-15.jpg"
                              alt=""
                           />
                        )}
                        <div className={cx('uploadAvatar')}>
                           <span className={cx('btn-upload-avatar')}>
                              <svg onClick={() => setImgAvatar(true)} viewBox="0 0 24 24" role="presentation">
                                 <g fill="currentColor" fillRule="evenodd">
                                    <path d="M2 6.994C2 5.893 2.898 5 3.99 5h16.02C21.108 5 22 5.895 22 6.994v12.012A1.997 1.997 0 0120.01 21H3.99A1.994 1.994 0 012 19.006V6.994zM12 17a4 4 0 100-8 4 4 0 000 8zm5-8c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1zM8 4c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1v1H8V4z" />
                                    <circle cx="12" cy="13" r="2" />
                                 </g>
                              </svg>
                           </span>
                        </div>
                     </div>
                     <Modal relative onClose={() => setImgAvatar(false)} isOpen={imgAvatar} width="160px">
                        <div className={cx(imgAvatar ? 'ShownUploadImgAvatar' : 'notShownUploadImg')}>
                           <p
                              onClick={() => {
                                 setIsToggleImgAvatar(true);
                                 setImgAvatar(false);
                              }}
                           >
                              Change profile photo
                           </p>
                           <p
                              onClick={() => {
                                 setIsToggleImgColor(true);
                                 setImgAvatar(false);
                              }}
                           >
                              Custom initials avatar
                           </p>
                        </div>
                     </Modal>
                  </div>
               </div>
            </div>
         </div>
         {isToggleImgColor && (
            <ModalSelectImg
               dataUserProfile={dataUserProfile}
               callApi={callApi}
               onClose={() => setIsToggleImgColor(false)}
               isOpen={isToggleImgColor}
            />
         )}
         {isToggleImgAvatar && (
            <AddProfilePhoto
               dataUserProfile={dataUserProfile}
               callApi={callApi}
               onClose={() => setIsToggleImgAvatar(false)}
               isOpen={isToggleImgAvatar}
            />
         )}
      </div>
   );
};
export default ProfileHeaderImg;
