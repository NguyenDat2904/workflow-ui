import React from 'react';
import style from './ItemIssue.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function itemIssue({ data }) {
   const { name, summary, projectID, status, img } = data;
   const issueStatus = (issueStatus) => {
      switch (issueStatus) {
         case 'TODO':
            return 'To do';
         case 'INPROGRESS':
            return 'In progress';
         case 'REVIEW':
            return 'Review';
         default:
            return 'Done';
      }
   };
   return (
      <>
         <Link
            to={`/projects/${projectID.codeProject}/issues/${name}`}
            className={cx('dUssGb')}
            style={{ '--_3vrhrb': 'calc(100% - 392px)' }}
         >
            <div className={cx('_4t3i1tcg')}>
               <img src={img} alt="image issue" className={cx('_4t3i1tcg')} />
            </div>
            <span className={cx('_16jlouyt')}>
               <h4 className={cx('bFhxjF')}>{summary}</h4>
               <small className={cx('sc-1pi081c-2')}>
                  <span>{name}</span>
                  <span>·</span>
                  <span>{projectID.nameProject}</span>
               </small>
            </span>
            <span className={cx('sc-1pi081c-3')}>{issueStatus(status)}</span>
         </Link>
      </>
   );
}

export default itemIssue;
