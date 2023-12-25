import { useState } from 'react';
import { Article } from '~/component/articles/Articles';
import { Form, Input, Button } from '~/component/Inputs/Inputs';
import './profileSecurity.scss';
import { patch } from '../../ultil/hpptRequest';
import HeaderSetting from '~/layout/HeaderSetting/HeaderSetting';
import { toast } from 'react-toastify';

export default function ProfileSecurity() {
   const [currentPassword, setCurrentPassword] = useState('');
   const [password, setPassword] = useState('');

   const handleChangePassword = async (e) => {
      e.preventDefault();

      if (password.length < 8) {
         toast.error('Password is too short.');
         return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const response = await patch(
         `/users/profile/changePassword/${user?._id}`,
         {
            oldPassword: currentPassword,
            newPassword: password,
         },
         {
            headers: {
               authorization: `${user?.accessToken}`,
               refresh_token: `${user?.refreshToken}`,
            },
         },
      );
      if (response.status === 200) {
         toast.success('Password changed successfully.');
      } else {
         toast.error('Failed to change password.');
      }
   };

   return (
      <>
         <HeaderSetting />
         <Article className="profile-security">
            <h2>Security</h2>
            <h4>Change your password</h4>
            <Form className="security-form" onSubmit={(e) => handleChangePassword(e)}>
               <Input
                  id="currentPassword"
                  label="Current password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  type="password"
               />
               <Input
                  id="password"
                  label="New password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  type="password"
               />
               <Button buttonStyle={'filled'} type={'submit'}>
                  Change Password
               </Button>
            </Form>
         </Article>
      </>
   );
}
