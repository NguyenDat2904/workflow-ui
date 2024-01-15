import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import style from './RowProject.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
import { Link, useNavigate } from 'react-router-dom';
import MenuProject from './MenuProject/MenuProject';
import { ProjectContext } from '~/contexts/project/projectContext';
const cx = classNames.bind(style);

function RowProject({ project, handleMoveToTrash }) {
   const [toggle, setToggle] = useState(false);
   const { setDetailProject } = useContext(ProjectContext);
   const navigate = useNavigate();

   const handleProjectNavigation = () => {
      setDetailProject(project);
      navigate(`/project/${project.codeProject}/board`);
   };

   return (
      <tr className={cx('row')}>
         {/* <td></td> */}
         <td>
            <Button viewAll noHover style={{ padding: '0px' }}>
               <div className={cx('block')}>
                  <div className={cx('img')}>
                     <span style={{ borderRadius: '3px' }}>
                        <img src={project.imgProject} alt="" />
                     </span>
                  </div>
                  <div className={cx('name')} onClick={handleProjectNavigation}>
                     {project.nameProject}
                  </div>
               </div>
            </Button>
         </td>
         <td>{project.codeProject}</td>
         <td>
            <div>Team-managed software</div>
         </td>
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
         <td></td>
         <td className={cx('menu-icon')}>
            <div onClick={() => setToggle(true)}>
               <Button noChildren backgroundNone leftIcon={<MenuIcon />} />
            </div>
            <div>
               <MenuProject
                  disable
                  codeProject={project?.codeProject}
                  id={project?._id}
                  onClick={() => handleMoveToTrash(project?._id)}
                  isOpen={toggle}
                  onClose={() => setToggle(false)}
               />
            </div>
         </td>
      </tr>
   );
}

export default RowProject;
