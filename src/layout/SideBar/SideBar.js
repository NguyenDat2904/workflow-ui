import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './SideBar.module.scss';
import WrapperSideBar from './WrapperSideBar/WrapperSideBar';
import Button from '~/component/Buttton/Button';
import { LeftIcon } from '~/component/icon/icon';
import Skeleton from 'react-loading-skeleton';
import { UserContext } from '~/contexts/user/userContext';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);

function SideBar() {
   const { detailProject } = useContext(UserContext);
   const location = useLocation();

   // GET detail Project

   return (
      <WrapperSideBar>
         <nav className={cx('sidebar-nav')}>
            <div className={cx('sidebar-info')}>
               <div className={cx('project-info')}>
                  <Button viewAll noHover>
                     <div className={cx('block')}>
                        <div className={cx('img')}>
                           <span>
                              <img
                                 src={
                                    detailProject?.imgProject
                                       ? detailProject?.imgProject
                                       : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                                 }
                                 alt=""
                              />
                           </span>
                        </div>
                        <div className={cx('name')}>
                           <div>{detailProject?.nameProject || <Skeleton height="18px" width="90px" />}</div>
                           <small>{detailProject?.codeProject || <Skeleton />}</small>
                        </div>
                     </div>
                  </Button>
               </div>
            </div>
            <div className={cx('sidebar-menu')}>
               <div className={cx('wrapper-menu')}>
                  <div className={cx('list-menu')}>
                     <div className={cx('button-back')}>
                        <Button
                           leftIcon={<LeftIcon />}
                           viewAll
                           backgroundNone
                           className={cx('custom-button')}
                           to="/project"
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
            <div className={cx('sidebar-footer')}>
               <div className={cx('block-footer')}>
                  <span>You're in a team-managed project</span>
                  <p className={cx('desc-footer')}>
                     <Button backgroundNone noHover>
                        Learn more
                     </Button>
                  </p>
               </div>
            </div>
         </nav>
      </WrapperSideBar>
   );
}

export default SideBar;
