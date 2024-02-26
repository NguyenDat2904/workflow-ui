import { useState } from 'react';
import HeaderSetting from '~/layout/HeaderSetting/HeaderSetting';
import { toast } from 'react-toastify';
import UserService from '~/services/user/userServices';
import { EyeIconPassword, EyeIconText, LoadingIcon } from '~/component/icon/icon';
import style from './profile.module.scss';
import classNames from 'classnames/bind';
import Input from '~/component/Input/Input';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './ChangePasswordValidation';
const cx = classNames.bind(style);

const userService = new UserService();

export default function ProfileSecurity() {
   const form = useForm({
      mode: 'all',
      defaultValues: {
         currentPassword: '',
         password: '',
      },
      resolver: yupResolver(schema),
   });

   const [loading, setLoading] = useState(false);
   const [showPass, setShowPass] = useState(false);

   const handleChangePassword = async (data) => {
      if (loading) return;
      setLoading(true);
      const response = await userService.changePassword(data?.currentPassword, data?.password);
      setLoading(false);
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
         <div className={cx('profile-security')}>
            <h2 className={cx('title-security')}>Security</h2>
            <h4 className={cx('change-password')}>Change your password</h4>
            <p className={cx('desc-change-password')}>
               When you change your password, we keep you logged in to this device but may log you out from your other
               devices.
            </p>
            <form className={cx('security-form')} onSubmit={form.handleSubmit(handleChangePassword)}>
               <ControllerForm
                  form={form}
                  name="currentPassword"
                  required
                  id="currentPassword"
                  label="Current password"
               >
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                     <Input
                        id="currentPassword"
                        placeholder="Enter current password"
                        type={showPass ? 'text' : 'password'}
                        search={'search'}
                        style={{ width: '100%' }}
                     />
                     <button type="button" className={cx('button')} onClick={handleShowPassword}>
                        {!showPass ? <EyeIconText /> : <EyeIconPassword />}
                     </button>
                  </div>
               </ControllerForm>
               <ControllerForm form={form} name="password" id="password" label="New password" required>
                  <Input
                     id="password"
                     label="New password"
                     placeholder="Enter new password"
                     type="password"
                     search={'search'}
                     style={{ width: '100%' }}
                  />
               </ControllerForm>
               <Button
                  blue
                  style={{
                     height: '32px',
                     marginTop: '24px',
                     fontSize: '14px',
                     minWidth: '110px',
                  }}
               >
                  {loading ? <LoadingIcon /> : 'Save changes'}
               </Button>
            </form>
         </div>
      </>
   );
}
