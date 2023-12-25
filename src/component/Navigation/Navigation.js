import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Navigation.module.scss';
import Modal from '../Modal/Modal';
import Button from '../Buttton/Button';
import { CloseIcon, DownIcon } from '../icon/icon';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import Role from './Role/Role';
const cx = classNames.bind(style);
function Navigation() {
   const [toggle, setToggle] = useState(false);
   return (
      <div className={cx('wrapper')}>
         <Modal width="400px" className={cx('modal')} maxWidth="400px">
            <div className={cx('main')}>
               <div className={cx('nav')}>
                  <header className={cx('header')}>
                     <div className={cx('title')}>
                        <h1>Add People to WorkFlow</h1>
                     </div>
                     <Button leftIcon={<CloseIcon />} noChildren backgroundNone></Button>
                  </header>
                  <form action="" className={cx('form')}>
                     <div className={cx('mb-16')}>
                        <Input
                           disableForm
                           label="Email"
                           placeholder="e.g., maria@company.com"
                           search="search"
                           className={cx('input')}
                        />
                     </div>
                     <div
                        className={cx('mb-16', 'pst-rlt')}
                        onBlur={() => {
                           setToggle(false);
                        }}
                     >
                        <Input
                           disableForm
                           label="Role"
                           placeholder="Administrator"
                           search="search"
                           rightIcon={<DownIcon />}
                           className={cx('input')}
                           onFocus={() => {
                              setToggle(true);
                           }}
                        />
                        {toggle && <Role />}
                     </div>
                     <div className={cx('mb-16', 'text-desc')}>
                        You're inviting people as admins. Admins can set up projects, add more people, install apps, and
                        upgrade plans. Alternatively, you can{' '}
                        <Link className={cx('text-link')}>invite people as users.</Link>
                     </div>
                     <div className={cx('mb-16', 'text-desc')}>
                        This site is protected by reCAPTCHA and the Google <Link>Privacy Policy</Link> and{' '}
                        <Link className={cx('text-link')}>Terms of Service</Link> apply.
                     </div>
                     <div className={cx('mb-16', 'text-end')}>
                        <Button blue>Add</Button>
                     </div>
                  </form>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Navigation;
