import { useState } from 'react';
import { Article } from '~/component/articles/Articles';
import { Form, Input, Button } from '~/component/Inputs/Inputs';
import './profileSecurity.scss';
import HeaderSetting from '~/layout/HeaderSetting/HeaderSetting';
import { toast } from 'react-toastify';
import UserService from '~/services/user/userServices';
import { EyeIconPassword, EyeIconText } from '~/component/icon/icon';
import style from './profile.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const userService = new UserService();

export default function ProfileSecurity() {
   const [currentPassword, setCurrentPassword] = useState('');
   const [password, setPassword] = useState('');
   const [blockClicks, setBlockClicks] = useState(false);
   const [showPass, setShowPass] = useState(false);

   const handleChangePassword = async (e) => {
      e.preventDefault();
      setBlockClicks(true);
      if (password.length < 8) {
         toast.error('Password is too short.');
         setBlockClicks(false);
         return;
      }

      const response = await userService.changePassword(currentPassword, password);
      setBlockClicks(false);
      if (response.status === 200) {
         toast.success('Password changed successfully.');
      } else {
         toast.error('Failed to change password.');
      }
   };

   const handleShowPassword = () => {
      if (!showPass) {
         setShowPass(true);
      } else {
         setShowPass(false);
      }
   };

   return (
      <>
         <HeaderSetting />
         <Article className="profile-security">
            <h2>Security</h2>
            <h4>Change your password</h4>
            <Form className="security-form" onSubmit={(e) => handleChangePassword(e)}>
               <div style={{ position: 'relative' }}>
                  <Input
                     id="currentPassword"
                     label="Current password"
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     placeholder="Current password"
                     type={showPass ? 'text' : 'password'}
                  />
                  <button type="button" className={cx('button')} onClick={handleShowPassword}>
                     {!showPass ? <EyeIconText /> : <EyeIconPassword />}
                  </button>
               </div>
               <Input
                  id="password"
                  label="New password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  type={showPass ? 'text' : 'password'}
               />
               <Button
                  className="buttonSubmit"
                  buttonStyle={'filled'}
                  type={blockClicks ? 'button' : 'submit'}
                  style={{
                     cursor: blockClicks ? 'no-drop' : 'pointer',
                     fontSize: '14px',
                     fontWeight: '600',
                     padding: '10px',
                  }}
               >
                  {blockClicks ? 'Loading...' : 'Change Password'}
               </Button>
            </Form>
         </Article>
      </>
   );
}
