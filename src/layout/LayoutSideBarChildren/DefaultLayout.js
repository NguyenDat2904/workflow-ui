import React from 'react';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../Header/Header';
import SideBarChildren from '../SideBar/SideBarChildren/SideBarChildren';
const cx = classNames.bind(style);

function LayoutSideBarChildren({ children }) {
   return (
      <div>
         <Header />
         <div className={cx('wrapper')}>
            <SideBarChildren />
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

export default LayoutSideBarChildren;
