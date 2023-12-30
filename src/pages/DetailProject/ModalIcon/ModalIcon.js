import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalIcon.module.scss';
import Modal from '~/component/Modal/Modal';
import { useForm } from 'react-hook-form';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import Button from '~/component/Buttton/Button';
import { imgProject } from '~/component/icon/icon';
const cx = classNames.bind(style);
function ModalIcon({ isOpen, isClose }) {
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
      <div className={cx('wrapper')}>
         <Modal width="390px" className={cx('modal')} maxWidth="390px" isOpen={isOpen} onClose={isClose}>
            <div className={cx('main')}>
               <div className={cx('nav')}>
                  <header className={cx('header')}>Choose an icon</header>
                  <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
                     <div className={cx('list-icon')}>{renderImg}</div>
                     <div className={cx('btn-group')}>
                        <Button onClick={isClose}>Cancel</Button>
                        <Button blue type="submit">
                           Select
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default ModalIcon;
