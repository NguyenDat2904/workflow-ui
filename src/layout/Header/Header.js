import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '~/component/Buttton/Button';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { DownIcon, NotificationIcon, SearchIcon, ShuttleIcon, UserIcon } from '~/component/icon/icon';
import { useLocation } from 'react-router-dom';
import ModalProject from '~/pages/Projects/ModalProject/ModalProject';
import ModalAccount from '~/pages/Profile/ModalAccount/ModalAccount';
import Input from '~/component/Input/Input';
import ModelNotification from '~/component/ModelNotification/ModelNotification';
import WorkService from '~/services/work/workServices';
import ModalCreateIssue from './ModalCreateIssue/ModalCreateIssue';
import ModalSearch from './ModalSearch/ModalSearch';
import IssueService from '~/services/issue/issueService';
import { UserContext } from '~/contexts/user/userContext';
import { Tooltip } from 'react-tooltip';
const cx = classNames.bind(style);
function Header() {
   const location = useLocation();
   const elementRef = useRef(null);
   const { dataUserProfile, getUser } = useContext(UserContext);
   // 1. useState
   const issueService = new IssueService();
   const [isToggleCreateIssue, setToggleCreateIssue] = useState(false);
   const [isModalSearch, setIsModalSearch] = useState(false);
   const [toggleMenu, setToggleMenu] = useState({
      yourWork: false,
      project: false,
      team: false,
      user: false,
      notification: false,
   });
   const [position, setPosition] = useState({ left: 0 });
   const [getIssueSearch, setGetIssueSearch] = useState([]);
   const [search, setSearch] = useState('');
   // 2. useEffect
   useEffect(() => {
      getUser();
   }, []);
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
      getListIssueSearch();
   }, [search]);

   const getListIssueSearch = async () => {
      const issue = await issueService.searchIssue({ search: search });
      if (issue.status === 200) setGetIssueSearch(issue.data.data);
   };
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
            });
      }
   };

   return (
      <div className={cx('header-nav')}>
         <header className={cx('header-layout')}>
            <nav>
               <Button leftIcon={<ShuttleIcon />} backgroundNone noChildren to="/"></Button>
               <div className={cx('list-menu')}>
                  <div
                     className={cx('menu', location.pathname === '/your-work' && 'active')}
                     onClick={() => handleToggle('yourWork')}
                  >
                     <Button backgroundNone to="/your-work">
                        Your work
                     </Button>
                  </div>
                  <div
                     className={cx('menu', location.pathname === '/project' && 'active')}
                     onClick={() =>
                        setToggleMenu((pre) => ({
                           ...pre,
                           project: true,
                        }))
                     }
                  >
                     <Button
                        rightIcon={<DownIcon />}
                        backgroundNone
                        className={cx(toggleMenu.project && 'toggle', 'text-blue')}
                     >
                        Projects
                     </Button>
                  </div>
                  <ModalProject
                     handleToggle={() =>
                        setToggleMenu((pre) => ({
                           ...pre,
                           project: !toggleMenu.project,
                        }))
                     }
                     isOpen={toggleMenu.project}
                  />
                  <div className={cx('menu')} onClick={() => setToggleCreateIssue(true)}>
                     <Button blue>Create</Button>
                  </div>
                  {isToggleCreateIssue && (
                     <ModalCreateIssue isOpen={isToggleCreateIssue} onClose={() => setToggleCreateIssue(false)} />
                  )}
               </div>
            </nav>

            <div className={cx('nav-right')}>
               <div className={cx('nav-icon')}>
                  <Input
                     data-tooltip-id="notification-tooltip"
                     data-tooltip-content="Search"
                     data-tooltip-place="bottom"
                     placeholder="Search"
                     leftIcon={<SearchIcon />}
                     type="text"
                     search="search"
                     className={cx('custom-input')}
                     style={{ width: isModalSearch ? '350px' : '230px' }}
                     onFocus={() => setIsModalSearch(true)}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <Tooltip
                     id="search-tooltip"
                     style={{
                        backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                        color: 'var(--ds-text-inverse, #FFFFFF)',
                        padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                        fontSize: 'var(--ds-font-size-075, 12px)',
                        maxWidth: '240px',
                     }}
                  />
                  <ModalSearch
                     isOpen={isModalSearch}
                     onClose={() => setIsModalSearch(false)}
                     getIssueSearch={getIssueSearch}
                  />
               </div>
               <div
                  data-tooltip-id="notification-tooltip"
                  data-tooltip-content="Notifications"
                  data-tooltip-place="bottom"
                  className={cx('nav-icon')}
                  onClick={() =>
                     setToggleMenu((pre) => ({
                        ...pre,
                        notification: true,
                     }))
                  }
                  ref={elementRef}
               >
                  <Button
                     className={cx('button-icon')}
                     backgroundNone
                     borderRadius
                     leftIcon={<NotificationIcon />}
                  ></Button>
               </div>
               <Tooltip
                  id="notification-tooltip"
                  style={{
                     backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                     color: 'var(--ds-text-inverse, #FFFFFF)',
                     padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                     fontSize: 'var(--ds-font-size-075, 12px)',
                     maxWidth: '240px',
                  }}
               />
               <ModelNotification
                  position={position.left}
                  handleToggle={() =>
                     setToggleMenu((pre) => ({
                        ...pre,
                        notification: false,
                     }))
                  }
                  isOpen={toggleMenu.notification}
               />
               <div
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content="Your profile"
                  data-tooltip-place="bottom"
                  style={{ width: '32px', height: '32px' }}
                  className={cx('nav-icon')}
                  onClick={() =>
                     setToggleMenu((pre) => ({
                        ...pre,
                        user: true,
                     }))
                  }
                  ref={elementRef}
               >
                  {dataUserProfile?.img ? (
                     <img className={cx('button-icon')} src={dataUserProfile.img} alt="" />
                  ) : (
                     <Button
                        noChildren
                        backgroundNone
                        borderRadius
                        className={cx('button-icon')}
                        style={{ width: '32px', height: '32px' }}
                        leftIcon={<UserIcon />}
                     ></Button>
                  )}
               </div>
               <Tooltip
                  id="user-tooltip"
                  style={{
                     backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                     color: 'var(--ds-text-inverse, #FFFFFF)',
                     padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                     fontSize: 'var(--ds-font-size-075, 12px)',
                     maxWidth: '240px',
                  }}
               />
               <ModalAccount
                  getUserData={dataUserProfile}
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
      </div>
   );
}

export default Header;
