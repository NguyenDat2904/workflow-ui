import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './modalSelectImg.module.scss';
import ModalProfile from '../../../component/modalProfile/modalProfile';
import UserService from '~/services/user/userServices';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(styles);

const ModalSelectImg = ({ onclickSeeModalSelectImg, callApi, dataUserProfile }) => {
   const userServices = new UserService();
   const [loading, setLoading] = useState(true);
   const [viewBackround, setViewBackground] = useState('rgb(0, 82, 204)');
   const [classNameButton, setClassNameButton] = useState('button1');
   const selectBackgroundImgProfile = (number) => {
      switch (number) {
         case 1:
            setViewBackground('rgb(0, 82, 204)');
            setClassNameButton('button1');
            break;
         case 2:
            setViewBackground('rgb(0, 163, 191)');
            setClassNameButton('button2');
            break;
         case 3:
            setViewBackground('rgb(0, 135, 90)');
            setClassNameButton('button3');
            break;
         case 4:
            setViewBackground('rgb(255, 153, 31)');
            setClassNameButton('button4');
            break;
         case 5:
            setViewBackground('rgb(222, 53, 11)');
            setClassNameButton('button5');
            break;
         case 6:
            setViewBackground('rgb(82, 67, 170)');
            setClassNameButton('button6');
            break;
         case 7:
            setViewBackground('rgb(23, 43, 77)');
            setClassNameButton('button7');
            break;

         default:
            break;
      }
   };
   const formick = useFormik({
      initialValues: {
         name: '',
      },
      validationSchema: yup.object({
         name: yup.string().required('Please enter at least 1 initial'),
      }),
      onSubmit: async (value) => {
         try {
            setLoading(false)
             const addUserInfo = await userServices.updateBackground(viewBackround, value.name);
         if (addUserInfo.status === 200) {
            await callApi();
            await onclickSeeModalSelectImg(0);
         }
         } catch (error) {
            console.log('can not upload bgr')
         }finally{
            setLoading(true)
         }
      },
   });
   return (
      <ModalProfile>
         <h3>Edit initials</h3>
         <form action="" onSubmit={formick.handleSubmit}>
            <div className={cx('viewSelectImg')}>
               <div className={cx('viewImg')} style={{ backgroundColor: viewBackround }}>
                  <h2>{formick.values.name}</h2>
               </div>
               <div className={cx('selectBackgroundImg')}>
                  <div className={cx('selectBackground')}>
                     <p className={cx('text')}>Background color</p>
                     <div className={cx('select')}>
                        <button
                           onClick={() => selectBackgroundImgProfile(1)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(0, 82, 204)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button1' ? 'button1' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(2)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(0, 163, 191)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button2' ? 'button2' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(3)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(0, 135, 90)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button3' ? 'button3' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(4)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(255, 153, 31)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button4' ? 'button4' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(5)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(222, 53, 11)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button5' ? 'button5' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(6)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(82, 67, 170)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button6' ? 'button6' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                        <button
                           onClick={() => selectBackgroundImgProfile(7)}
                           type="button"
                           className={cx('selectButtonBackground')}
                           style={{ backgroundColor: 'rgb(23, 43, 77)' }}
                        >
                           <svg
                              className={cx(classNameButton === 'button7' ? 'button7' : 'noneIconButton')}
                              viewBox="0 0 24 24"
                              role="presentation"
                           >
                              <path
                                 d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
                                 fill="currentColor"
                              />
                           </svg>
                        </button>
                     </div>
                  </div>
                  <div className={cx('fillInitials')}>
                     <p className={cx('text')}>Initials</p>
                     <input
                        className={cx('input')}
                        onChange={formick.handleChange}
                        name="name"
                        maxLength={4}
                        type="text"
                        placeholder="Enter up to 4 initials"
                     />
                  </div>
               </div>
            </div>
            {formick.errors.name && formick.touched.name && (
               <div className={cx('errorView')}>
                  <p className={cx('errorInitials')}>
                     <svg>
                        <path
                           d="M12 14a1 1 0 01-1-1V8a1 1 0 012 0v5a1 1 0 01-1 1m0 3a1 1 0 010-2 1 1 0 010 2"
                           fill="currentColor"
                        ></path>
                     </svg>
                     {formick.errors.name}
                  </p>
               </div>
            )}
            <p>
               This replaces your current profile picture. Only users who have permission to view your profile picture
               will see this.
            </p>
            <Link to="">
               <p style={{ color: '#0052CC', marginTop: 5 }}>Manage your profile visibility</p>
            </Link>
            <div className={cx('buttonUploadImg')}>
               <button className={cx('buttonCancelUpload')} type="button" onClick={() => onclickSeeModalSelectImg(0)}>
                  Cancel
               </button>
               <button className={cx('buttonUpload')} style={{cursor:loading?'pointer':'not-allowed'}} type={loading?"submit":'button'}>
               {loading ? 'Update' : 'Update...'}
               </button>
            </div>
         </form>
      </ModalProfile>
   );
};
export default ModalSelectImg;
