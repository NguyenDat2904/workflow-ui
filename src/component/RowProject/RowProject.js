import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './RowProject.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
import { Link } from 'react-router-dom';
import MenuProject from './MenuProject/MenuProject';
import moment from 'moment';
import ModalAccept from '../ModalAccept/ModalAccept';
import { ProjectContext } from '~/contexts/project/projectContext';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(style);

function RowProject({ project, handleMoveToTrash, trash, handleDeletePer, handleRestore }) {
   const { members, setMembers } = useContext(ProjectContext);

   const projectService = new WorkService();

   // 1. State
   const [toggle, setToggle] = useState(false);
   const [isToggleAcceptRestore, setIsToggleAcceptRestore] = useState(false);
   const [isToggleAcceptDelete, setIsToggleAcceptDelete] = useState(false);
   const [isToggleAcceptMoveToTrash, setIsToggleAcceptMoveToTrash] = useState(false);

   const formattedDate = moment(project?.deleteAt).format('MMM D, YYYY');
   const futureDate = moment(project?.deleteAt).add(60, 'days');
   const currentDate = moment();

   const remainingTime = moment.duration(futureDate.diff(currentDate));
   const remainingDays = remainingTime.asDays();
   const remainingText = `In ${Math.floor(remainingDays)} days`;

   useEffect(() => {
      getMembers();
   }, [project]);

   // Get Member
   const getMembers = async () => {
      if (project.codeProject) {
         const listMembers = await projectService.getMember({ codeProject: project?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   };

   return (
      <>
         {isToggleAcceptRestore && (
            <ModalAccept
               blue
               headerTitle="Restore project?"
               isOpen={isToggleAcceptRestore}
               isClose={() => setIsToggleAcceptRestore(false)}
               title="The project along with its issues, components, attachments, and versions will be restored. "
               handleAccept={() => handleRestore(project?.codeProject)}
            />
         )}
         {isToggleAcceptDelete && (
            <ModalAccept
               btn="Delete"
               headerTitle={`Delete  “${project?.nameProject}“`}
               isOpen={isToggleAcceptDelete}
               isClose={() => setIsToggleAcceptDelete(false)}
               title="The project along with its issues, components, attachments, and versions will be deleted forever. "
               handleAccept={() => handleDeletePer(project?.codeProject)}
            />
         )}
         {isToggleAcceptMoveToTrash && (
            <ModalAccept
               waring
               btn="Move"
               headerTitle={`Move to trash?“`}
               isOpen={isToggleAcceptMoveToTrash}
               isClose={() => setIsToggleAcceptMoveToTrash(false)}
               title="The project along with its issues, components, attachments, and versions will be available in the trash for 60 days after which it will be permanently deleted."
               handleAccept={() => handleMoveToTrash(project?.codeProject)}
            />
         )}
         <tr className={cx('row')}>
            {trash === false && <td></td>}
            <td>
               <Button viewAll noHover style={{ padding: '0px' }}>
                  <div className={cx('block')}>
                     <div className={cx('img')}>
                        <span style={{ borderRadius: '3px' }}>
                           <img src={project.imgProject} alt="" />
                        </span>
                     </div>
                     <div className={cx('name')}>
                        <div>
                           <Link to={!trash && `/project/${project.codeProject}/board`}>{project.nameProject}</Link>
                        </div>
                     </div>
                  </div>
               </Button>
            </td>
            <td style={{ paddingLeft: '14px' }}>{project.codeProject}</td>
            {!trash && (
               <td>
                  <div>Team-managed software</div>
               </td>
            )}
            <td>
               <Button viewAll noHover style={{ padding: '0px' }}>
                  <div className={cx('block')}>
                     <div className={cx('img')}>
                        <span>
                           <img
                              src={
                                 project.infoUserAdmin?.img !== ''
                                    ? project.infoUserAdmin?.img
                                    : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                              }
                              alt=""
                           />
                        </span>
                     </div>
                     <div className={cx('name')}>
                        <div>
                           <Link>{project.infoUserAdmin?.name}</Link>
                        </div>
                     </div>
                  </div>
               </Button>
            </td>
            <td>
               {trash && (
                  <div className={cx('user-delete')}>
                     {formattedDate} <span>by</span> <div className="text-link">{project?.nameUserDelete}</div>
                  </div>
               )}
            </td>
            {trash && (
               <td>
                  <div className={cx('user-delete')}>{remainingText}</div>
               </td>
            )}

            <td className={cx('menu-icon')}>
               <div onClick={() => setToggle(true)}>
                  <Button noChildren backgroundNone leftIcon={<MenuIcon />} />
               </div>
               <div>
                  <MenuProject
                     trash={trash}
                     disable
                     codeProject={project?.codeProject}
                     id={project?._id}
                     onClick={() => {
                        setToggle(false);
                        setIsToggleAcceptMoveToTrash(true);
                     }}
                     handleDeletePer={() => {
                        setIsToggleAcceptDelete(true);
                        setToggle(false);
                     }}
                     handleRestore={() => {
                        setIsToggleAcceptRestore(true);
                        setToggle(false);
                     }}
                     isOpen={toggle}
                     onClose={() => setToggle(false)}
                  />
               </div>
            </td>
         </tr>
      </>
   );
}

export default RowProject;
