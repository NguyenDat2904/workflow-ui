import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalProject.module.scss';
import Modal from '~/component/Modal/Modal';
import { NavLink } from 'react-router-dom';
import Button from '~/component/Buttton/Button';
import WorkService from '~/services/work/workServices';
import { LoadingIcon } from '~/component/icon/icon';
const cx = classNames.bind(style);
function ModalProject({ handleToggle, isOpen }) {
   const projectService = new WorkService();
   // 1. useState
   const [projectLimit, getProjectLimit] = useState([]);
   const [loading, setIsLoading] = useState(true);
   // 2. useEffect
   const getProject = async () => {
      setIsLoading(true);
      const projects = await projectService.getListProject({ deleteProject: false, limit: 4 });
      if (projects.status === 200) {
         getProjectLimit(projects.data.data);
      }
      setIsLoading(false);
   };
   useEffect(() => {
      if (isOpen === true) {
         getProject();
      }
      if (!isOpen) setIsLoading(true);
   }, [isOpen]);
   // 3. Func
   const renderListProject = projectLimit?.map((project) => {
      return (
         <Button
            viewAll
            key={project?._id}
            className={cx('custom-button')}
            to={`/project/${project?.codeProject}/black-log`}
            onClick={handleToggle}
         >
            <div className={cx('block')}>
               <div className={cx('img')}>
                  <span>
                     <img src={project.imgProject} alt="" />
                  </span>
               </div>
               <div className={cx('name')}>
                  <div>
                     {project.nameProject} ({project.codeProject})
                  </div>
               </div>
            </div>
         </Button>
      );
   });
   return (
      <Modal width="320px" locationTransform="164px" isOpen={isOpen} onClose={handleToggle}>
         {loading ? (
            <div style={{ position: 'relative', height: '100px' }}>
               <LoadingIcon color="var(--ds-icon-subtle,  #0065ff)" />
            </div>
         ) : (
            <>
               {projectLimit && projectLimit?.length === 0 ? (
                  <div className={cx('top', 'modal-top')}>
                     <img
                        style={{ '--_ve50id': '138px' }}
                        src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/project-empty.0864e274.svg"
                        alt=""
                     />
                     <div className={cx('desc')}>
                        <div>
                           <p>You don't have any projects yet.</p>
                        </div>
                        <div>
                           <NavLink className={cx('desc-link')}>Create</NavLink>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className={cx('list-project')}>
                     <div className="modal-title">RECENT</div>
                     <div>{renderListProject}</div>
                  </div>
               )}
            </>
         )}
         <div className={cx('bottom', '.modal-bottom ')}>
            <span>
               <Button viewAll to="/project" onClick={handleToggle}>
                  All Projects
               </Button>
               <Button viewAll to="/project/trash" onClick={handleToggle}>
                  Deleted Project
               </Button>
               <Button viewAll to="/project/create">
                  Create project
               </Button>
            </span>
         </div>
      </Modal>
   );
}

export default ModalProject;
