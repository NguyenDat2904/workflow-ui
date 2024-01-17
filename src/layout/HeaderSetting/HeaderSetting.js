import React, { useState, useContext, useRef, useEffect } from 'react';
import Button from '~/component/Buttton/Button';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './HeaderSetting.module.scss';
import { AuthContext } from '~/contexts/auth/authContext';
import UserService from '~/services/user/userServices';
import {  UserIcon } from '~/component/icon/icon';
import { useLocation } from 'react-router-dom';
import ModalAccount from '~/pages/Profile/ModalAccount/ModalAccount';
const cx = classNames.bind(style);

function HeaderSetting() {
   const location = useLocation();
   const userServices = new UserService();
   // 1. State
   const [toggleMenu, setToggleMenu] = useState({
      yourWork: false,
      project: false,
      team: false,
      user: false,
      phone: false,
   });
   const [position, setPosition] = useState({ left: 0 });
   const [getUserData, setGetUserData] = useState({});
   const elementRef = useRef(null);
   const { accessToken } = useContext(AuthContext);
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
   useEffect(() => {
      const getUser = async () => {
         if (accessToken) {
            const users = await userServices.getUserProfile();
            if (users.status === 200) {
               setGetUserData(users.data);
            }
         }
      };
      getUser();
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
         case 'phone':
            setToggleMenu((pre) => ({
               ...pre,
               user: !toggleMenu.phone,
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
            <Button className={cx('homePage')} backgroundNone noChildren to="/">
               {' '}
               WorkFlow
            </Button>
            <div className={cx('list-menu')}>
               <Link to={'/manage-profile/profile-and-visibility'}>
                  <div
                     className={cx('menu', location.pathname === '/manage-profile/profile-and-visibility' && 'active')}
                     onClick={() => handleToggle('team')}
                  >
                     <Button backgroundNone className={cx(toggleMenu.team && 'toggle', 'text-blue')}>
                        Profile And visibility
                     </Button>
                  </div>
               </Link>
               <Link to={'/manage-profile/phone'}>
                  <div
                     className={cx('menu', location.pathname === '/manage-profile/phone' && 'active')}
                     onClick={() => handleToggle('phone')}
                  >
                     <Button backgroundNone className={cx(toggleMenu.team && 'toggle', 'text-blue')}>
                        Phone number
                     </Button>
                  </div>
               </Link>
               <Link to={'/profile/security'}>
                  <div
                     className={cx('menu', location.pathname === '/profile/security' && 'active')}
                     onClick={() => handleToggle('yourWork')}
                  >
                     <Button backgroundNone className={cx(toggleMenu.yourWork && 'toggle', 'text-blue')}>
                        Security
                     </Button>
                  </div>
               </Link>
            </div>
         </nav>
         <div className={cx('nav-right')}>
            <div ref={elementRef} onClick={() => handleToggle('user')} className={cx('nav-icon')}>
               {getUserData.img === '' ? (
                  <Button
                     className={cx('button-icon')}
                     noChildren
                     backgroundNone
                     borderRadius
                     leftIcon={<UserIcon />}
                  ></Button>
               ) : (
                  <img src={getUserData?.img} alt="" />
               )}
            </div>
            <ModalAccount
               getUserData={getUserData}
               position={position.left}
               handleToggle={() =>
                  setToggleMenu((pre) => ({
                     ...pre,
                     user: false,
                  }))
               }
               isOpen={toggleMenu.user}
            />
         </div>
      </header>
   );
}

export default HeaderSetting;
