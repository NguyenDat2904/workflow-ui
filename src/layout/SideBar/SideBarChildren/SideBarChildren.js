import React, { useContext } from 'react';
import Button from '~/component/Buttton/Button';
import { LeftIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from '~/layout/SideBar/SideBar.module.scss';
import { UserContext } from '~/contexts/user/userContext';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
const cx = classNames.bind(style);
function SideBarChildren() {
   const { detailProject } = useContext(UserContext);
   const location = useLocation();

   return (
      <SideBar>
         <div className={cx('sidebar-menu')}>
            <div className={cx('wrapper-menu')}>
               <div className={cx('list-menu')} style={{ '--_6w8gix': '60px' }}>
                  <div className={cx('button-back')}>
                     <Button
                        leftIcon={<LeftIcon />}
                        viewAll
                        backgroundNone
                        className={cx('custom-button')}
                        to={`/project/${detailProject?.codeProject}/black-log`}
                     >
                        Back to project
                     </Button>
                  </div>
                  <div className={cx('list')}>
                     <div className={cx('line')}>
                        <Button
                           to={`/project/${detailProject?.codeProject}/settings/details`}
                           backgroundNone
                           viewAll
                           className={cx(
                              'custom-button',
                              location.pathname === `/project/${detailProject?.codeProject}/settings/details` &&
                                 'active',
                           )}
                           style={{ marginTop: '6px' }}
                        >
                           <span className={cx('css-active')}>Details</span>
                        </Button>
                        <Button backgroundNone viewAll className={cx('custom-button')} style={{ marginTop: '6px' }}>
                           Access
                        </Button>
                        <Button backgroundNone viewAll className={cx('custom-button')} style={{ marginTop: '6px' }}>
                           Notifications
                        </Button>
                        <Button backgroundNone viewAll className={cx('custom-button')} style={{ marginTop: '6px' }}>
                           Issue types
                        </Button>
                        <Button backgroundNone viewAll className={cx('custom-button')} style={{ marginTop: '6px' }}>
                           Column and status
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SideBar>
   );
}

export default SideBarChildren;
