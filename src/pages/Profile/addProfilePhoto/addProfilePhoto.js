import React, { useState } from 'react';
import ModalProfile from '../../../component/modalProfile/modalProfile';
import Button from '~/component/Buttton/Button';
import classNames from 'classnames/bind';
import UserService from '~/services/user/userServices';
import styles from './addProfilePhoto.module.scss';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import { LoadingIcon } from '~/component/icon/icon';
const cx = classNames.bind(styles);

const AddProfilePhoto = ({ onclickSeeModalSelectImg, dataUserProfile, callApi, onClose, isOpen }) => {
   const userServices = new UserService();
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(false);
   const handalUploadImg = (e) => {
      setImage(e.target.files[0]);
   };
   const handleSubmitUploadImg = async (e) => {
      if (loading) {
         return;
      }
      e.preventDefault();
      try {
         const formData = new FormData();
         formData.append('img', image);
         if (formData) {
            setLoading(true);
            const upload = await userServices.uploadImg(formData);
            if (upload.status === 200) {
               await callApi();
               await onclickSeeModalSelectImg(0);
            }
         }
      } catch (error) {
         console.log('can not upload');
      } finally {
         setLoading(false);
         onClose();
      }
   };
   return (
      <ModalIcon width="375px" isOpen={isOpen} isClose={onClose} header="Change profile photo">
         <form onSubmit={handleSubmitUploadImg} action="">
            <div className={cx('addProfilePhoto')}>
               <div className={cx('pictureFrame')}>
                  <img
                     style={{ width: image === null ? '150px' : '100%' }}
                     src={
                        image === null
                           ? 'data:image/png;base64,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'
                           : `${URL?.createObjectURL(image)}`
                     }
                     alt=""
                  />
               </div>
               <input
                  className={cx('upfileDisplayNone')}
                  name="img"
                  type="file"
                  id="uploadAvatarImg"
                  onChange={handalUploadImg}
               />
               <p className={cx('orUpload')}>or</p>
               <label htmlFor="uploadAvatarImg" className={cx('buttonUpload')}>
                  Upload a photo
               </label>
            </div>
            <div className={cx('buttonSubmit')}>
               <Button children="Cancel" type="button" onClick={onClose} />
               <Button
                  children={!loading ? 'Update' : <LoadingIcon />}
                  type={!loading ? 'submit' : 'button'}
                  style={{ cursor: !loading ? 'pointer' : 'not-allowed', minWidth: '77px' }}
               />
            </div>
         </form>
      </ModalIcon>
   );
};
export default AddProfilePhoto;
