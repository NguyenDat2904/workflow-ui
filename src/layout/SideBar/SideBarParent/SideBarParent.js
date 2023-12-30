import React, { useContext } from 'react';
import Button from '~/component/Buttton/Button';
import { LeftIcon, MenuIcon, SettingIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from '~/layout/SideBar/SideBar.module.scss';
import { UserContext } from '~/contexts/user/userContext';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
const cx = classNames.bind(style);

function SideBarParent() {
   const { detailProject } = useContext(UserContext);
   const location = useLocation();

   return (
      <SideBar>
         <div className={cx('sidebar-menu')}>
            <div className={cx('wrapper-menu')}>
               <div className={cx('list-menu')}>
                  <Button
                     backgroundNone
                     viewAll
                     leftIcon={<MenuIcon />}
                     className={cx('custom-button')}
                     style={{ marginTop: '6px' }}
                  >
                     Blacklog
                  </Button>
                  <Button backgroundNone viewAll className={cx('custom-button')} style={{ marginTop: '6px' }}>
                     Board
                  </Button>
                  <div className={cx('list')}>
                     <div className={cx('line')}>
                        <Button
                           backgroundNone
                           viewAll
                           leftIcon={<SettingIcon />}
                           className={cx('custom-button')}
                           style={{ marginTop: '6px' }}
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
