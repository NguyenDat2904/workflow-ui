import React, { useContext } from 'react';
import Button from '~/component/Buttton/Button';
import { BlackLogIcon, BoardIcon, SettingIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from '~/layout/SideBar/SideBar.module.scss';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
import { ProjectContext } from '~/contexts/project/projectContext';
const cx = classNames.bind(style);

function SideBarParent() {
   const { detailProject } = useContext(ProjectContext);
   const location = useLocation();

   return (
      <SideBar>
         <div className={cx('sidebar-menu')}>
            <div className={cx('wrapper-menu')}>
               <div className={cx('list-menu')} style={{ '--_6w8gix': '100px' }}>
                  <div style={{ marginBottom: '4px' }}>
                     <Button
                        to={`/project/${detailProject?.codeProject}/black-log`}
                        backgroundNone
                        viewAll
                        leftIcon={<BlackLogIcon />}
                        className={cx(
                           'custom-button',
                           location.pathname === `/project/${detailProject?.codeProject}/black-log` && 'active',
                        )}
                        style={{ marginTop: '6px', gap: '12px' }}
                     >
                        <span
                           className={cx(
                              location.pathname === `/project/${detailProject?.codeProject}/black-log` && 'css-active',
                           )}
                        >
                           Blacklog
                        </span>
                     </Button>
                     <Button
                        to={`/project/${detailProject?.codeProject}/board`}
                        leftIcon={<BoardIcon />}
                        backgroundNone
                        viewAll
                        className={cx(
                           'custom-button',
                           location.pathname === `/project/${detailProject?.codeProject}/board` && 'active',
                        )}
                        style={{ marginTop: '6px', gap: '12px' }}
                     >
                        <span
                           className={cx(
                              location.pathname === `/project/${detailProject?.codeProject}/board` && 'css-active',
                           )}
                        >
                           Board
                        </span>
                     </Button>
                  </div>
                  <div className={cx('list')}>
                     <div className={cx('line')}>
                        <Button
                           to={`/project/${detailProject?.codeProject}/settings/details`}
                           backgroundNone
                           viewAll
                           leftIcon={<SettingIcon />}
                           className={cx('custom-button')}
                           style={{ marginTop: '6px', gap: '12px' }}
                        >
                           Project Setting
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SideBar>
   );
}

export default SideBarParent;
