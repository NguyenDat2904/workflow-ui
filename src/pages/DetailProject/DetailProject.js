import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './DetailProject.module.scss';
import Button from '~/component/Buttton/Button';
import { MenuIcon } from '~/component/icon/icon';
import MenuProject from '~/component/RowProject/MenuProject/MenuProject';
import FormChangeProject from './FormChangeProject/FormChangeProject';
import { useNavigate, useParams } from 'react-router-dom';
import NavUrl from '~/component/NavUrl/NavUrl';
import Skeleton from 'react-loading-skeleton';
import { UserContext } from '~/contexts/user/userContext';
import WorkService from '~/services/work/workServices';
import { ProjectContext } from '~/contexts/project/projectContext';
const cx = classNames.bind(style);
function DetailProject() {
   const navigate = useNavigate();
   const { loadingDetailsProject, parseuser } = useContext(UserContext);
   const { detailProject } = useContext(ProjectContext);
   const [toggle, setToggle] = useState(false);
   const params = useParams();
   const projectService = new WorkService();

   // 3. Func
   const handleMoveToTrash = async (id) => {
      const moveToTrash = await projectService.deleteProject(id, parseuser?._id);
      if (moveToTrash === 200) {
         navigate('/project');
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('content')}>
            <div className={cx('project')}>
               <div className={cx('details')}>
                  <div className={cx('details-header')}>
                     <div className={cx('title')}>
                        {loadingDetailsProject ? (
                           <Skeleton width="310px" height="24px" />
                        ) : (
                           <NavUrl
                              url={[
                                 { name: 'Projects', link: '/project' },
                                 {
                                    name: detailProject.nameProject,
                                    link: `/project/${detailProject.codeProject}/black-log`,
                                    img: detailProject.imgProject,
                                 },
                                 {
                                    name: 'Project setting',
                                    link: `/project/${detailProject.codeProject}/settings/details`,
                                 },
                              ]}
                           />
                        )}
                     </div>
                  </div>
                  <div className={cx('details-main')}>
                     <div className={cx('details-title')}>
                        <div className={cx('details-title-h1')}>
                           <div className={cx('h1')}>
                              <h1>Details</h1>
                           </div>
                           <div className={cx('details-button')}>
                              <div onClick={() => setToggle(true)}>
                                 <Button noChildren backgroundNone leftIcon={<MenuIcon />}></Button>
                              </div>
                              <MenuProject
                                 onClick={() => handleMoveToTrash(params?.id)}
                                 isOpen={toggle}
                                 onClose={() => setToggle(false)}
                              />
                           </div>
                        </div>
                     </div>
                     <div className={cx('details-form')}>
                        <FormChangeProject id={params?.id} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailProject;
