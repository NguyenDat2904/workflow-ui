import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './DetailProject.module.scss';
import Button from '~/component/Buttton/Button';
import { MenuIcon } from '~/component/icon/icon';
import MenuProject from '~/component/RowProject/MenuProject/MenuProject';
import FormChangeProject from './FormChangeProject/FormChangeProject';
import { useParams } from 'react-router-dom';
import NavUrl from '~/component/NavUrl/NavUrl';
import Skeleton from 'react-loading-skeleton';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(style);
function DetailProject() {
   const { handleMoveToTrash, detailProject, loadingDetailsProject } = useContext(UserContext);
   const [toggle, setToggle] = useState(false);
   const params = useParams();

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
                           <NavUrl url={['Projects', detailProject.nameProject, 'Project setting']} />
                        )}
                     </div>
                  </div>
                  <div className={cx('details-main')}>
                     <div className={cx('details-title')}>
                        <div className={cx('details-title-h1')}>
                           <div className={cx('h1')}>
                              <h1>Details</h1>
                           </div>
                           <div className={cx('details-button')} onBlur={() => setToggle(false)}>
                              <div onClick={() => setToggle(!toggle)}>
                                 <Button noChildren backgroundNone leftIcon={<MenuIcon />}></Button>
                              </div>
                              {toggle && <MenuProject onClick={() => handleMoveToTrash(params._id)} />}
                           </div>
                        </div>
                     </div>
                     <div className={cx('details-form')}>
                        <FormChangeProject id={params._id} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailProject;
