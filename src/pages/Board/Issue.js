import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as VeryUpArrow } from '../../asset/icons/veryUpArrow.svg';
import { ReactComponent as UpArrow } from '../../asset/icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../asset/icons/downArrow.svg';
import { ReactComponent as Equal } from '../../asset/icons/equal.svg';
import { ReactComponent as VeryDownArrow } from '../../asset/icons/veryDownArrow.svg';

const cx = classNames.bind(style);

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
            <img src={`${issueDetail.assignee.img}`} alt="" />
            {priorityIcon}
         </div>
      </Card>
   );
}