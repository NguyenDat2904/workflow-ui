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
const cx = classNames.bind(style);
const projectService = new WorkService();

function Header() {
   const location = useLocation();
   const elementRef = useRef(null);
   const { dataUserProfile, getUser } = useContext(UserContext);
   // 1. useState
   const issueService = new IssueService();
   const [projects, getProjects] = useState([]);
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
   const getProject = async () => {
      const projects = await projectService.getListProject({ deleteProject: false });
      if (projects.status === 200) {
         getProjects(projects.data.data);
      }
   };
   useEffect(() => {
      getProject();
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

   const listProject = projects?.map((project) => {
      return {
         label: `${project.nameProject} - (${project.codeProject})` || '',
         img: project.imgProject,
         codeProject: project.codeProject,
      };
   });
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
                     <Button rightIcon={<DownIcon />} backgroundNone to="/your-work">
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
                     <ModalCreateIssue
                        isOpen={isToggleCreateIssue}
                        data={listProject}
                        onClose={() => setToggleCreateIssue(false)}
                     />
                  )}
               </div>
            </nav>

            <div className={cx('nav-right')}>
               <div className={cx('nav-icon')}>
                  <Input
                     placeholder="Search"
                     leftIcon={<SearchIcon />}
                     type="text"
                     search="search"
                     className={cx('custom-input')}
                     style={{ width: isModalSearch ? '350px' : '230px' }}
                     onFocus={() => setIsModalSearch(true)}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <ModalSearch
                     isOpen={isModalSearch}
                     onClose={() => setIsModalSearch(false)}
                     getIssueSearch={getIssueSearch}
                  />
               </div>
               <div
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
