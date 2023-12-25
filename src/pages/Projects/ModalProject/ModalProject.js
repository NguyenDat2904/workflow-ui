import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import style from './ModalProject.module.scss';
import Modal from '~/component/Modal/Modal';
import { NavLink } from 'react-router-dom';
import Button from '~/component/Buttton/Button';
import { AppContext } from '~/hook/context/context';
const cx = classNames.bind(style);
function ModalProject({ handleToggle, onBlur }) {
   const { dataProject } = useContext(AppContext);
   // 3. Func
   function renderNumbers(arr) {
      const displayedNumbers = arr?.slice(-4).reverse();
      return displayedNumbers;
   }
   const renderListProject = renderNumbers(dataProject)?.map((project) => {
      return (
         <Button viewAll key={project._id} className={cx('custom-button')}>
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
                  {/* <small>dathhcc2@gmail.com</small> */}
               </div>
            </div>
         </Button>
      );
   });
   return (
      <Modal width="320px" locationTransform="164px" onBlur={onBlur}>
         {dataProject?.length === 0 ? (
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
         <div className={cx('bottom', '.modal-bottom ')}>
            <span>
               <Button viewAll to="/project" onClick={handleToggle}>
                  View all projects
               </Button>
               <Button viewAll>Create project</Button>
            </span>
         </div>
      </Modal>
   );
}

export default ModalProject;
