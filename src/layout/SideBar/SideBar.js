import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './SideBar.module.scss';
import WrapperSideBar from './WrapperSideBar/WrapperSideBar';
import Button from '~/component/Buttton/Button';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import WorkService from '~/services/work/workServices';
import { ProjectContext } from '~/contexts/project/projectContext';

const cx = classNames.bind(style);

function SideBar({ children }) {
   const { detailProject, setDetailProject } = useContext(ProjectContext);
   const workProject = new WorkService();
   const param = useParams();
   const getDetailProject = async () => {
      const project = await workProject.projectDetail(param.id);
      if (project.status === 200) setDetailProject(project.data);
   };
   useEffect(() => {
      getDetailProject();
   }, [param]);
   return (
      <WrapperSideBar>
         <nav className={cx('sidebar-nav')}>
            <div className={cx('sidebar-info')}>
               <div className={cx('project-info')}>
                  <Button viewAll noHover style={{ padding: '0' }}>
                     <div className={cx('block')}>
                        <div className={cx('img')}>
                           <span>
                              <img
                                 src={
                                    detailProject?.imgProject
                                       ? `/imgs/projects/${detailProject?.imgProject}`
                                       : '/imgs/projects/default.png'
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
         </nav>
      </WrapperSideBar>
   );
}

export default SideBar;
