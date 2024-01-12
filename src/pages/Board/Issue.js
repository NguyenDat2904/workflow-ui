import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as VeryUpArrow } from '../../asset/icons/veryUpArrow.svg';
import { ReactComponent as UpArrow } from '../../asset/icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../asset/icons/downArrow.svg';
import { ReactComponent as Equal } from '../../asset/icons/equal.svg';
import { ReactComponent as VeryDownArrow } from '../../asset/icons/veryDownArrow.svg';
import { ReactComponent as Bug } from '../../asset/icons/circle.svg';
import { ReactComponent as Epic } from '../../asset/icons/epic.svg';
import { ReactComponent as Task } from '../../asset/icons/task.svg';
import { StoryIcon as Story } from '~/component/icon/icon';

const cx = classNames.bind(style);

export function IssueIcon({ type }) {
   let icon = '';
   let iconTypeStyle;
   switch (type) {
      case 'Bug':
         icon = <Bug />;
         iconTypeStyle = cx('issue-icon', 'icon-bug');
         break;
      case 'Epic':
         icon = <Epic />;
         iconTypeStyle = cx('issue-icon', 'icon-epic');
         break;
      case 'Story':
         icon = <Story />;
         iconTypeStyle = cx('issue-icon', 'icon-story');
         break;
      default:
         icon = <Task />;
         iconTypeStyle = cx('issue-icon', 'icon-task');
         break;
   }

   return <span className={iconTypeStyle}>{icon}</span>;
}

export default function Issue({ issueDetail, ...props }) {
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
         <p>{issueDetail.summary}</p>
         <div className={cx('metadata')}>
            <IssueIcon type={issueDetail.type} />
            <img src={`${issueDetail.assignee.img}`} alt="" />
            {priorityIcon}
         </div>
      </Card>
   );
}
