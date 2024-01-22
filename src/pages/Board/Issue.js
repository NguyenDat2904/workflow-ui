import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Board.scss';
import classNames from 'classnames/bind';
import { Card } from '~/component/cards/Cards';
import { IssueIcon } from './IssueIcon';

const cx = classNames.bind(style);

export default function Issue({ issueDetail, projectId, ...props }) {
   const navigate = useNavigate();

   function handleChangingPage() {
      navigate(`/projects/${projectId}/issues/${issueDetail.name}`);
   }

   let priorityIcon;
   if (issueDetail.priority === 'High') {
      priorityIcon = 'https://tcx19.atlassian.net/images/icons/priorities/high.svg';
   } else if (issueDetail.priority === 'Medium') {
      priorityIcon = 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg';
   } else if (issueDetail.priority === 'Low') {
      priorityIcon = 'https://tcx19.atlassian.net/images/icons/priorities/low.svg';
   } else if (issueDetail.priority === 'Highest') {
      priorityIcon = 'https://tcx19.atlassian.net/images/icons/priorities/high.svg';
   } else if (issueDetail.priority === 'Lowest') {
      priorityIcon = 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg';
   }

   return (
      <div className={cx('task-container')} onClick={handleChangingPage}>
         <Card className={cx('task')} {...props}>
            <p>{issueDetail.summary}</p>
            <div className={cx('metadata')}>
               <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IssueIcon type={issueDetail.issueType} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{issueDetail.name}</span>
               </span>
               <span>
                  <img src={priorityIcon} alt="" style={{ width: '1.25rem' }} />
               </span>
            </div>
         </Card>
      </div>
   );
}
