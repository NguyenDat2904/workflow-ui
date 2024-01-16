import React from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import { WarningIcon } from '../icon/icon';
import classNames from 'classnames/bind';
import style from './ModalAccept.module.scss';
import Button from '../Buttton/Button';

const cx = classNames.bind(style);
function ModalAccept({ isOpen, isClose, name, title, handleAccept, headerTitle, blue }) {
   return (
      <ModalIcon
         width="400px"
         isOpen={isOpen}
         isClose={isClose}
         header={headerTitle}
         leftIcon={blue ? null : <WarningIcon />}
      >
         <div className={cx('text-desc')}>
            <p>
               {title}
               <b>{name}</b>?
            </p>
         </div>
         <div className={cx('btn-group')}>
            <Button onClick={isClose}>Cancel</Button>
            <Button blue={blue ? true : false} warning={blue ? false : true} type="submit" onClick={handleAccept}>
               {blue ? 'Restore' : 'Delete'}
            </Button>
         </div>
      </ModalIcon>
   );
}

export default ModalAccept;
