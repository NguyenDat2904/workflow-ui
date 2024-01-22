import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Board.scss';
import classNames from 'classnames/bind';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as VeryUpArrow } from '../../asset/icons/veryUpArrow.svg';
import { ReactComponent as UpArrow } from '../../asset/icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../asset/icons/downArrow.svg';
import { ReactComponent as Equal } from '../../asset/icons/equal.svg';
import { ReactComponent as VeryDownArrow } from '../../asset/icons/veryDownArrow.svg';
import { IssueIcon } from './IssueIcon';

const cx = classNames.bind(style);

export default function Issue({ issueDetail, projectId, ...props }) {
   const navigate = useNavigate();

   function handleChangingPage() {
      navigate(`/projects/${projectId}/issues/${issueDetail.name}`);
   }

   let priorityIcon;
   if (issueDetail.priority === 'High') {
      priorityIcon = <UpArrow />;
   } else if (issueDetail.priority === 'Medium') {
      priorityIcon = <Equal />;
   } else if (issueDetail.priority === 'Low') {
      priorityIcon = <DownArrow />;
   } else if (issueDetail.priority === 'Highest') {
      priorityIcon = <VeryUpArrow />;
   } else if (issueDetail.priority === 'Lowest') {
      priorityIcon = <VeryDownArrow />;
   }

   return (
      <Card className={cx('task')} {...props}>
         {console.log(issueDetail)}
         <p onClick={handleChangingPage}>{issueDetail.summary}</p>
         <div className={cx('metadata')}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
               <IssueIcon type={issueDetail.issueType} />
               <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{issueDetail.name}</span>
            </span>
            <span>
               {priorityIcon}
               {/* <img src={`${issueDetail.assignee.img}`} alt="" /> */}
            </span>
         </div>
      </Card>
   );
}
