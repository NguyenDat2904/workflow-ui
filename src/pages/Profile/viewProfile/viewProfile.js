import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './viewProfile.module.scss';
import { Buiding, Location, BagIcon, TreeIcon, Email, Phone, AddIcon } from '~/component/icon/icon';
import RecentActivityOfUser from '../recentActivityOfUser/recentActivityOf';

const cx = classNames.bind(styles);
const ViewProfile = ({ dataUserProfile }) => {
   return (
      <div className={cx('viewProfile')}>
         <div className={cx('viewInfoUser')}>
            <h2>{dataUserProfile.name}</h2>
            <Link to="/manage-profile/profile-and-visibility">
               <button className={cx('moreInformationUser')}>Manage your account</button>
            </Link>
            <div className={cx('viewInfo')}>
               <div className={cx('info')}>
                  <h3 className={cx('titleViewInfo')}>ABOUT</h3>
                  <div className={cx('fillView')}>
                     <div className={cx('fillViewInfo')}>
                        <BagIcon />
                        <span className={cx('showProfile')}>
                           {dataUserProfile.jopTitle ? (
                              dataUserProfile.jopTitle
                           ) : (
                              <span className={cx('infoDefault')}>Your name of your</span>
                           )}
                        </span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <TreeIcon />
                        <span className={cx('showProfile')}>
                           {dataUserProfile.department ? (
                              dataUserProfile.department
                           ) : (
                              <span className={cx('infoDefault')}>Your department</span>
                           )}
                        </span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <Buiding />
                        <span className={cx('showProfile')}>
                           {dataUserProfile.organization ? (
                              dataUserProfile.organization
                           ) : (
                              <span className={cx('infoDefault')}>Your organization</span>
                           )}
                        </span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <Location />

                        <span className={cx('showProfile')}>
                           {dataUserProfile.location ? (
                              dataUserProfile.location
                           ) : (
                              <span className={cx('infoDefault')}>Your location</span>
                           )}
                        </span>
                     </div>
                  </div>
               </div>
               <div className={cx('viewContact')}>
                  <h3 className={cx('titleViewInfo')}>CONTACT</h3>
                  <div className={cx('contact')}>
                     <div className={cx('methotContact')}>
                        <span className={cx('methotContact-icon')}>
                           <Email />
                        </span>
                        <p className={cx('addressContact')}>{dataUserProfile.email}</p>
                     </div>
                     <div className={cx('methotContact')}>
                        <span className={cx('methotContact-icon-phone')}>
                           <Phone />
                        </span>
                        <p className={cx('addressContact')}>{dataUserProfile.phone || 'Your phone number'}</p>
                     </div>
                  </div>
               </div>
               <div className={cx('team')}>
                  <h3 className={cx('titleViewInfo')}>TEAMS</h3>
                  <div className={cx('addTeam')}>
                     <div className={cx('newTeam')}>
                        <span>
                           <AddIcon />
                        </span>
                        <p>Create a team</p>
                     </div>
                  </div>
                  <p className={cx('linkToLegal')}> View privacy policy</p>
               </div>
            </div>
         </div>
         <div className={cx('recentActivityOfUser')}>
            <RecentActivityOfUser />
         </div>
      </div>
   );
};
export default ViewProfile;
