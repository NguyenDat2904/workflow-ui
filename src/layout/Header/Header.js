import React, { useEffect, useRef, useState } from 'react';
import Button from '~/component/Buttton/Button';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import {
   DownIcon,
   HelpIcon,
   NotificationIcon,
   SearchIcon,
   SettingIcon,
   ShuttleIcon,
   UserIcon,
} from '~/component/icon/icon';
import { useLocation } from 'react-router-dom';
import ModalProject from '~/pages/Projects/ModalProject/ModalProject';
import ModalAccount from '~/pages/Profile/ModalAccount/ModalAccount';
import Input from '~/component/Input/Input';
import Navigation from '~/component/Navigation/Navigation';
const cx = classNames.bind(style);

function Header() {
   const location = useLocation();
   const elementRef = useRef(null);

   // 1. State
   const [toggleMenu, setToggleMenu] = useState({
      yourWork: false,
      project: false,
      team: false,
      user: false,
   });
   const [position, setPosition] = useState({ left: 0 });

   // 2. useEffect

   useEffect(() => {
      const getElementPosition = () => {
         const element = elementRef.current;

         if (element) {
            const { left } = element.getBoundingClientRect();
            setPosition({ left });
         }
      };

      getElementPosition();

      // Lắng nghe sự kiện resize trên cửa sổ trình duyệt
      window.addEventListener('resize', getElementPosition);

      // Hủy bỏ lắng nghe khi component unmount
      return () => {
         window.removeEventListener('resize', getElementPosition);
      };
   }, []);
   // 3. Func
   const handleToggle = (toggle) => {
      switch (toggle) {
         case 'project':
            setToggleMenu((pre) => ({
               ...pre,
               project: !toggleMenu.project,
            }));
            break;
         case 'yourWork':
            setToggleMenu((pre) => ({
               ...pre,
               yourWork: !toggleMenu.yourWork,
            }));
            break;
         case 'team':
            setToggleMenu((pre) => ({
               ...pre,
               team: !toggleMenu.team,
            }));
            break;
         case 'user':
            setToggleMenu((pre) => ({
               ...pre,
               user: !toggleMenu.user,
            }));
            break;
         default:
            setToggleMenu({
               yourWork: false,
               project: false,
               team: false,
            });
      }
   };
   return (
      <header className={cx('header-layout')}>
         <nav>
            <Button leftIcon={<ShuttleIcon />} backgroundNone noChildren to="/"></Button>
            <div className={cx('list-menu')}>
               <div
                  className={cx('menu', location.pathname === '/your-work' && 'active')}
                  onClick={() => handleToggle('yourWork')}
               >
                  <Button rightIcon={<DownIcon />} backgroundNone to="/your-work">
                     Your work
                  </Button>
               </div>
               <div
                  className={cx('menu', location.pathname === '/project' && 'active')}
                  onClick={() => handleToggle('project')}
               >
                  <Button
                     rightIcon={<DownIcon />}
                     backgroundNone
                     className={cx(toggleMenu.project && 'toggle', 'text-blue')}
                  >
                     Projects
                  </Button>
               </div>
               {toggleMenu.project && (
                  <ModalProject handleToggle={() => handleToggle('project')} onBlur={() => console.log(1)} />
               )}
               <div className={cx('menu')} onClick={() => handleToggle('team')}>
                  <Button rightIcon={<DownIcon />} backgroundNone>
                     Teams
                  </Button>
               </div>
               <div className={cx('menu')}>
                  <Button blue>Create</Button>
                  {/* <Navigation /> */}
               </div>
            </div>
         </nav>
         <div className={cx('nav-right')}>
            <div className={cx('nav-icon')}>
               <Input placeholder="Search" leftIcon={<SearchIcon />} type="text" search="search" />
            </div>
            <div className={cx('nav-icon')}>
               <Button
                  className={cx('button-icon')}
                  noChildren
                  backgroundNone
                  borderRadius
                  leftIcon={<NotificationIcon />}
               ></Button>
            </div>
            <div className={cx('nav-icon')}>
               <Button
                  className={cx('button-icon', 'custom-button')}
                  noChildren
                  backgroundNone
                  borderRadius
                  leftIcon={<HelpIcon />}
               ></Button>
            </div>
            <div className={cx('nav-icon')}>
               <Button
                  className={cx('button-icon')}
                  noChildren
                  backgroundNone
                  borderRadius
                  leftIcon={<SettingIcon />}
               ></Button>
            </div>
            <div ref={elementRef} className={cx('nav-icon')} onClick={() => handleToggle('user')}>
               <Button
                  className={cx('button-icon')}
                  noChildren
                  backgroundNone
                  borderRadius
                  leftIcon={<UserIcon />}
               ></Button>
            </div>
            {toggleMenu.user && <ModalAccount handleToggle={() => handleToggle('user')} position={position.left} />}
         </div>
      </header>
   );
}

export default Header;
