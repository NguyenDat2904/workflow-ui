import React, { useState, useEffect } from 'react';
import UserService from '~/services/user/userServices';
import { useForm } from 'react-hook-form';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import Input from '~/component/Input/Input';
import classNames from 'classnames/bind';
import styles from './ProfileAndPhone.module.scss';
import HeaderSetting from '~/layout/HeaderSetting/HeaderSetting';
const cx = classNames.bind(styles);
const ProfileAndPhone = () => {
   const userServices = new UserService();
   const [dataUser, setDataUser] = useState({});
   const [loading, setLoading] = useState(true);
   const callApi = async () => {
      const APIuser = await userServices.getUserProfile();
      setDataUser(APIuser.data);
   };
   useEffect(() => {
      callApi();
   }, []);
   const form = useForm({
      mode: 'all',
      defaultValues: {
         phone: '',
      },
   });
   const handleSubmit = async (formData) => {
      try {
         setLoading(false);
         const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
         if (!regexPhone.test(formData.phone)) {
            form.setError('phone', {
               type: 'manual',
               message: 'Bạn vui lòng nhập đúng định dạng',
            });
         }
         if (formData.phone === '') {
            form.setError('phone', {
               type: 'manual',
               message: 'Bạn vui lòng nhập số điện thoại',
            });
         }
         if (formData.phone !== '' && regexPhone.test(formData.phone)) {
          const result=  await userServices.updateUser('phone', formData.phone);
          if(result.status===200){
            callApi()
          }
         }
      } catch (error) {
         console.log('can not update new phone');
      } finally {
         setLoading(true);
      }
   };
   return (
      <>
         <HeaderSetting />
         <form className={cx('profileAndPhone')} onSubmit={form.handleSubmit(handleSubmit)}>
            <h3 className={cx('titlePhone')}>Số điện thoại</h3>
            <p className={cx('currentPhoneNumber')}>Số điện thoại hiện tại</p>
            <p className={cx('currentPhone')}>
               Số điện thoại hiện tại của bạn là <span className={cx('phoneNumber')}>{dataUser.phone}</span>
            </p>
            <ControllerForm form={form} name="phone" label="Số điện thoại mới">
               <Input
                  placeholder="Nhập số điện thoại mới"
                  type="text"
                  search="search"
                  style={{ width: '100%' }}
                  className={cx(form.formState.dirtyFields?.phone ? '' : 'summaryInput')}
               />
            </ControllerForm>
            <Button className={cx('buttonSubmit')} blue type={loading ? 'submit' : 'button'}>
               {loading ? 'Lưu thay đổi' : 'Đang lưu...'}
            </Button>
         </form>
      </>
   );
};
export default ProfileAndPhone;
