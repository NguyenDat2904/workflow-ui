import React, { useState } from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import { LoadingIcon, WarningIcon } from '../icon/icon';
import classNames from 'classnames/bind';
import style from './ModalAccept.module.scss';
import Button from '../Buttton/Button';

const cx = classNames.bind(style);
function ModalAccept({ isOpen, isClose, name, title, handleAccept, headerTitle, blue }) {
   const [isLoading, setIsLoading] = useState(false);
   console.log(isLoading);
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
            <Button
               style={{ minWidth: '71px' }}
               blue={blue ? true : false}
               warning={blue ? false : true}
               type="submit"
               onClick={async () => {
                  setIsLoading(true);
                  await handleAccept();
                  setIsLoading(false);
               }}
            >
               {isLoading ? <LoadingIcon /> : <span>{blue ? 'Restore' : 'Delete'}</span>}
            </Button>
         </div>
      </ModalIcon>
   );
}

export default ModalAccept;
