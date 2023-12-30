import React from 'react';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../Header/Header';
import SideBarChildren from '../SideBar/SideBarChildren/SideBarChildren';
import SideBarParent from '../SideBar/SideBarParent/SideBarParent';
const cx = classNames.bind(style);

function DefaultLayout({ children }) {
   return (
      <div>
         <Header />
         <div className={cx('wrapper')}>
            <SideBarParent />
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

export default DefaultLayout;
