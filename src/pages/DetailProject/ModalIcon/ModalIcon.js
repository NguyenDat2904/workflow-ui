import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalIcon.module.scss';
import Modal from '~/component/Modal/Modal';

const cx = classNames.bind(style);
function ModalIcon({ width, isOpen, isClose, children, header, imgBanner, leftIcon }) {
   return (
      <div className={cx('wrapper')}>
         <Modal width={width} className={cx('modal')} maxWidth={width} isOpen={isOpen} onClose={isClose}>
            {imgBanner && (
               <img
                  src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/badge-banner.af218529.svg"
                  alt=""
               />
            )}
            <div className={cx('main')}>
               <div className={cx('nav')}>
                  <div className={cx("header-popup")}>
                     {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
                     <header className={cx('header')}>{header}</header>
                  </div>
                  {children}
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default ModalIcon;
