import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './WrapperSideBar.module.scss';
import Button from '~/component/Buttton/Button';
import { LeftIcon, RightIcon } from '~/component/icon/icon';
const cx = classNames.bind(style);
function WrapperSideBar({ children }) {
   const [toggleSideBar, setToggleSideBar] = useState(true);
   const handleToggleSideBar = () => {
      setToggleSideBar(!toggleSideBar);
   };
   return (
      <div style={{ width: !toggleSideBar ? '20px' : '240px' }}>
         <div className={cx('wrapper')} style={{ '--leftSidebarWidth': !toggleSideBar ? '20px' : '240px' }}>
            <div className={cx('sidebar-show', !toggleSideBar && 'sidebar-disable')}>
               <div className={cx('sidebar-width')}>{children}</div>
            </div>
            <div className={cx('sidebar-resize')}>
               <div className={cx('sidebar-thumb')}></div>
               <div className={cx('sidebar-icon')}>
                  <Button
                     noChildren
                     leftIcon={!toggleSideBar ? <RightIcon /> : <LeftIcon />}
                     className={cx('custom-icon')}
                     onClick={handleToggleSideBar}
                  ></Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default WrapperSideBar;
