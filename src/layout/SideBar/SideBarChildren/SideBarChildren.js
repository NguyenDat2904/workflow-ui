import React from 'react';
import Button from '~/component/Buttton/Button';
import { LeftIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from '~/layout/SideBar/SideBar.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import SideBar from '../SideBar';
const cx = classNames.bind(style);
function SideBarChildren() {
   const { id } = useParams();
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
                        to={`/project/${id}/black-log`}
                     >
                        Back to project
                     </Button>
                  </div>
                  <div className={cx('list')}>
                     <div className={cx('line')}>
                        <Button
                           to={`/project/${id}/setting/details`}
                           backgroundNone
                           viewAll
                           className={cx(
                              'custom-button',
                              location.pathname === `/project/${id}/setting/details` && 'active',
                           )}
                           style={{ marginTop: '6px' }}
                        >
                           <span className={cx(location.pathname === `/project/${id}/setting/details` && 'css-active')}>
                              Details
                           </span>
                        </Button>
                        <Button
                           to={`/project/${id}/setting/access`}
                           backgroundNone
                           viewAll
                           className={cx(
                              'custom-button',
                              location.pathname === `/project/${id}/setting/access` && 'active',
                           )}
                           style={{ marginTop: '6px' }}
                        >
                           <span className={cx(location.pathname === `/project/${id}/setting/access` && 'css-active')}>
                              Access
                           </span>
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
