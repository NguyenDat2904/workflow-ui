import React, { useContext, useEffect, useState } from 'react';
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
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import { Tooltip } from 'react-tooltip';
const cx = classNames.bind(style);
function DetailProject() {
   const navigate = useNavigate();
   const { loadingDetailsProject, parseuser, dataUserProfile } = useContext(UserContext);
   const { detailProject, members, setMembers } = useContext(ProjectContext);
   const [toggle, setToggle] = useState(false);
   const [toggleMoveToTrash, setToggleMoveToTrash] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const params = useParams();
   const projectService = new WorkService();

   useEffect(() => {
      getMembers();
   }, [detailProject]);

   // 3. Func
   const handleMoveToTrash = async (id) => {
      if (isLoading) return;
      setIsLoading(true);
      const moveToTrash = await projectService.deleteProject(id, parseuser?._id);
      if (moveToTrash.status === 200) {
         navigate('/project');
      }
      setIsLoading(false);
   };

   // Get Member
   const getMembers = async () => {
      if (detailProject.codeProject) {
         const listMembers = await projectService.getMember({ codeProject: detailProject?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   };

   const roleUsers = members?.filter((user) => {
      return user._id === dataUserProfile._id;
   });
   const roleUser = roleUsers[0];

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
                                 <Button
                                    data-tooltip-id="delete-project"
                                    data-tooltip-content="You are not an admin."
                                    data-tooltip-place="top"
                                    backgroundNone
                                    leftIcon={<MenuIcon />}
                                    disable={roleUser?.role !== 'admin'}
                                    style={{
                                       cursor: roleUser?.role === 'admin' ? 'pointer' : 'not-allowed',
                                       height: '32px',
                                       background: 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                                    }}
                                 ></Button>
                              </div>
                              {roleUser?.role !== 'admin' && (
                                 <Tooltip
                                    id="delete-project"
                                    style={{
                                       backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                       color: 'var(--ds-text-inverse, #FFFFFF)',
                                       padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                       fontSize: 'var(--ds-font-size-075, 12px)',
                                       maxWidth: '240px',
                                       textAlign: 'center',
                                    }}
                                 />
                              )}
                              <MenuProject
                                 onClick={() => {
                                    setToggleMoveToTrash(true);
                                    setToggle(false);
                                 }}
                                 isOpen={roleUser?.role === 'admin' && toggle}
                                 onClose={() => setToggle(false)}
                              />
                           </div>
                        </div>
                     </div>
                     {toggleMoveToTrash && (
                        <ModalAccept
                           waring
                           btn="Move"
                           headerTitle={`Move to trash?“`}
                           isOpen={toggleMoveToTrash}
                           isClose={() => setToggleMoveToTrash(false)}
                           title="The project along with its issues, components, attachments, and versions will be available in the trash for 60 days after which it will be permanently deleted."
                           handleAccept={() => handleMoveToTrash(params?.id)}
                        />
                     )}
                     <div className={cx('details-form')}>
                        <FormChangeProject id={params?.id} roleUser={roleUser} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailProject;
