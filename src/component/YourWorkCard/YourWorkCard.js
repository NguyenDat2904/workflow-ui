import React from 'react';
import classNames from 'classnames/bind';
import style from './YourWorkCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function YourWorkCard({ data }) {
   const { nameProject, codeProject, listManagers = 0, listMembers = 0, imgProject } = data;
   const countMember = 1 + listManagers.length + listMembers.length;
   return (
      <Link to={`/project/${codeProject}/board`} className={cx('section')}>
         <div className={cx('card')}>
            <div className={cx('link')}>
               <span className={cx('span')}>
                  <img
                     src={imgProject}
                     width="24px"
                     height="24px"
                     className={cx('img-project')}
                     alt=" project"
                     style={{ borderRadius: '3px' }}
                  />
               </span>
               <div className={cx('title')}>
                  <p>{nameProject}</p>
                  <p>{countMember > 1 ? countMember + ' members' : countMember + ' member'}</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default YourWorkCard;
