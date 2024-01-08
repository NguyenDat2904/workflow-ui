import React from 'react';
import ModalIcon from '../ModalIcon/ModalIcon';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import { imgProject } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from './FormIcon.module.scss';
import Button from '~/component/Buttton/Button';
const cx = classNames.bind(style);
function FormIcon({ isOpen, isClose }) {
   const form = useForm({
      mode: 'all',
   });
   const watchImageSrc = form.watch('imageSrc', '');

   const handleSubmit = (data) => {
      console.log(data.imageSrc);
   };
   const handleImageClick = (index, src) => {
      form.setValue('activeButton', index);
      form.setValue('imageSrc', src);
   };

   const renderImg = imgProject.map((icon, index) => {
      const fieldName = `img${index}`;

      return (
         <ControllerForm form={form} name={`img${index}`} id={fieldName} key={index}>
            <div className={cx('item-icon')}>
               <label htmlFor={fieldName}>
                  <input
                     type="radio"
                     className={cx('input-icon')}
                     checked={watchImageSrc === icon}
                     id={fieldName}
                     defaultValue={icon}
                     onChange={() => handleImageClick(index, icon)}
                  />
                  <img
                     src={icon}
                     alt=""
                     className={cx(watchImageSrc === icon && 'active')}
                     onClick={() => handleImageClick(index, icon)}
                  />
               </label>
            </div>
         </ControllerForm>
      );
   });

   return (
      <ModalIcon width="300px" isOpen={isOpen} isClose={isClose} header="Choose an icon">
         <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className={cx('list-icon')}>{renderImg}</div>
            <div className={cx('btn-group')}>
               <Button onClick={isClose}>Cancel</Button>
               <Button blue type="submit">
                  Select
               </Button>
            </div>
         </form>
      </ModalIcon>
   );
}

export default FormIcon;
