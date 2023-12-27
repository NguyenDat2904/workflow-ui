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
            <Link to="/profile/profile-and-visibility">
               <button className={cx('moreInformationUser')}>Edit information</button>
            </Link>
            <div className={cx('viewInfo')}>
               <div className={cx('info')}>
                  <h3 className={cx('titleViewInfo')}>ABOUT</h3>
                  <div className={cx('fillView')}>
                     <div className={cx('fillViewInfo')}>
                        <BagIcon />

                        <span className={cx('showProfile')}>{dataUserProfile.jopTitle?.slice(0, 20)}...</span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <TreeIcon />

                        <span className={cx('showProfile')}>{dataUserProfile.department?.slice(0, 20)}...</span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <Buiding />

                        <span className={cx('showProfile')}>{dataUserProfile.organization?.slice(0, 20)}...</span>
                     </div>
                     <div className={cx('fillViewInfo')}>
                        <Location />

                        <span className={cx('showProfile')}>{dataUserProfile.location?.slice(0, 20)}...</span>
                     </div>
                  </div>
               </div>
               <div className={cx('viewContact')}>
                  <h3 className={cx('titleViewInfo')}>CONTACT</h3>
                  <div className={cx('contact')}>
                     <div className={cx('methotContact')}>
                        <span>
                           <Email />
                        </span>

                        <p className={cx('addressContact')}>{dataUserProfile.email}</p>
                     </div>
                     <div className={cx('methotContact')}>
                        <span>
                           <Phone className="svgPhone" />
                        </span>
                        <p className={cx('addressContact')}>{dataUserProfile.phone}</p>
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
