import React from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import { WarningIcon } from '../icon/icon';
import classNames from 'classnames/bind';
import style from './ModalAccept.module.scss';
import Button from '../Buttton/Button';

const cx = classNames.bind(style);
function ModalAccept({ isOpen, isClose, name, title, handleAccept, headerTitle }) {
   return (
      <ModalIcon width="400px" isOpen={isOpen} isClose={isClose} header={headerTitle} leftIcon={<WarningIcon />}>
         <div className={cx('text-desc')}>
            <p>
               {title}
               <b>{name}</b>?
            </p>
         </div>
         <div className={cx('btn-group')}>
            <Button onClick={isClose}>Cancel</Button>
            <Button warning type="submit" onClick={handleAccept}>
               Delete
            </Button>
         </div>
      </ModalIcon>
   );
}

export default ModalAccept;
