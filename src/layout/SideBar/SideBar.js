import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './SideBar.module.scss';
import WrapperSideBar from './WrapperSideBar/WrapperSideBar';
import Button from '~/component/Buttton/Button';
import Skeleton from 'react-loading-skeleton';
import { UserContext } from '~/contexts/user/userContext';
import { useParams } from 'react-router-dom';
import WorkService from '~/services/work/workServices';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);

function SideBar({ children }) {
   const { detailProject, setDetailProject } = useContext(UserContext);
   const workProject = new WorkService();
   const param = useParams();
   const getDetailProject = async () => {
      const project = await workProject.projectDetail(param.id);
      if (project.status === 200) setDetailProject(project.data);
   };

   useEffect(() => {
      getDetailProject();
   }, []);
   // GET detail Project
   return (
      <WrapperSideBar>
         <nav className={cx('sidebar-nav')}>
            <div className={cx('sidebar-info')}>
               <div className={cx('project-info')}>
                  <Button viewAll noHover>
                     <div className={cx('block')}>
                        <div className={cx('img')}>
                           <span>
                              <img
                                 src={
                                    detailProject?.imgProject
                                       ? detailProject?.imgProject
                                       : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                                 }
                                 alt=""
                              />
                           </span>
                        </div>
                        <div className={cx('name')}>
                           <div>{detailProject?.nameProject || <Skeleton height="18px" width="90px" />}</div>
                           <small>{detailProject?.codeProject || <Skeleton />}</small>
                        </div>
                     </div>
                  </Button>
               </div>
            </div>
            {children}
            <div className={cx('sidebar-footer')}>
               <div className={cx('block-footer')}>
                  <span>You're in a team-managed project</span>
                  <p className={cx('desc-footer')}>
                     <Button backgroundNone noHover>
                        Learn more
                     </Button>
                  </p>
               </div>
            </div>
         </nav>
      </WrapperSideBar>
   );
}

export default SideBar;
