import React, { useContext } from 'react';
import Modal from '~/component/Modal/Modal';
import classNames from 'classnames/bind';
import style from './ModalAccount.module.scss';
import Button from '~/component/Buttton/Button';
import { ManagerIcon } from '~/component/icon/icon';
import { AuthContext } from '~/contexts/auth/authContext';
const cx = classNames.bind(style);
function ModalAccount({ handleToggle, position, getUserData, isOpen }) {
   const { setIsAuthenticated } = useContext(AuthContext);

   const handleLogout = (e) => {
      e.preventDefault();
      handleToggle();
      setIsAuthenticated(false);
      localStorage.clear();
   };

   return (
      <Modal width="234px" locationTransform={`${position - 324}px`} isOpen={isOpen} onClose={handleToggle}>
         <div className={cx('top', 'modal-top')}>
            <div className={cx('modal-title')}>Account</div>
            <div>
               <Button viewAll noHover>
                  <div className={cx('block')}>
                     <div className={cx('img')}>
                        <span>
                           <img
                              src={
                                 getUserData?.img
                                    ? getUserData?.img
                                    : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                              }
                              alt=""
                           />
                        </span>
                     </div>
                     <div className={cx('name')}>
                        <div>{getUserData?.name}</div>
                        <small>{getUserData?.email}</small>
                     </div>
                  </div>
               </Button>
               <Button viewAll to="/profile/profile-and-visibility" onClick={handleToggle}>
                  <div className={cx('manager')}>
                     <span>Manager account</span>
                     <span className={cx('manager-icon')}>
                        <ManagerIcon />
                     </span>
                  </div>
               </Button>
            </div>
         </div>
         <div className={cx('center', 'modal-bottom')}>
            <div className={cx('modal-title')}>JIRA</div>
            <div>
               <Button viewAll to="/profile" onClick={handleToggle}>
                  Profile
               </Button>
            </div>
         </div>
         <div className={cx('bottom', 'modal-bottom')}>
            <Button viewAll onClick={handleLogout}>
               Logout
            </Button>
         </div>
      </Modal>
   );
}

export default ModalAccount;
