import React from 'react';
import classNames from 'classnames/bind';
import style from './Role.module.scss';
import Modal from '~/component/Modal/Modal';
import Button from '~/component/Buttton/Button';
const cx = classNames.bind(style);

function Role() {
   return (
      <Modal width="348px" className={cx('wrapper')}>
         <div>
            <Button viewAll className={cx('item')}>
               Administrator
            </Button>
         </div>
         <div>
            <Button viewAll className={cx('item')}>
               Manager
            </Button>
         </div>
         <div>
            <Button viewAll className={cx('item')}>
               Member
            </Button>
         </div>
      </Modal>
   );
}

export default Role;
