import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './RowProject.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
import { Link } from 'react-router-dom';
import MenuProject from './MenuProject/MenuProject';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(style);

function RowProject({ project }) {
   const { handleMoveToTrash } = useContext(UserContext);
   // 1. State
   const [toggle, setToggle] = useState(false);

   // 3. Func
   function handlePopupClick(event) {
      event.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan truyền lên phần tử cha
   }

   return (
      <tr className={cx('row')}>
         <td></td>
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
                        <Link>{project.nameProject}</Link>
                     </div>
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
                              project.adminID.img !== ''
                                 ? project.adminID.img
                                 : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                           }
                           alt=""
                        />
                     </span>
                  </div>
                  <div className={cx('name')}>
                     <div>
                        <Link>{project.adminID.name}</Link>
                     </div>
                  </div>
               </div>
            </Button>
         </td>
         <td></td>
         <td className={cx('menu-icon')} onClick={() => setToggle(!toggle)} onBlur={() => setToggle(false)}>
            <div>
               <Button noChildren backgroundNone leftIcon={<MenuIcon />} />
            </div>
            {toggle && (
               <div onClick={handlePopupClick}>
                  <MenuProject disable id={project._id} onClick={() => handleMoveToTrash(project._id)} />
               </div>
            )}
         </td>
      </tr>
   );
}

export default RowProject;
