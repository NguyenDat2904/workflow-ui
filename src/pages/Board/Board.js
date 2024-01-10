import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as VeryUpArrow } from '../../asset/icons/veryUpArrow.svg';
import { ReactComponent as UpArrow } from '../../asset/icons/upArrow.svg';
import { ReactComponent as DownArrow } from '../../asset/icons/downArrow.svg';
import { ReactComponent as Equal } from '../../asset/icons/equal.svg';

const cx = classNames.bind(style);

function Issue({ issueDetail, ...props }) {
   // console.log(issueDetail);

   let priorityIcon;
   if (issueDetail.priority === 'High') {
      priorityIcon = <UpArrow />;
   } else if (issueDetail.priority === 'Medium') {
      priorityIcon = <Equal />;
   } else if (issueDetail.priority === 'Low') {
      priorityIcon = <DownArrow />;
   } else if (issueDetail.priority === 'Highest') {
      priorityIcon = <VeryUpArrow />;
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

export default function Board() {
   const sampleIssue = {
      summary: 'Sub Issue',
      assignee: {
         name: 'Huy Van Hoang',
         img: 'https://i.pravatar.cc/300',
      },
      priority: 'High',
   };

   const rightSection = (
      <div className={cx('sprint-buttons')}>
         <Button buttonStyle="filled">Complete Sprint</Button>
         <Button>Edit Sprint</Button>
      </div>
   );

   return (
      <div className={cx('board')}>
         <HeaderProject headerName={'Board'} rightSection={rightSection} />
         <div className={cx('task-board')}>
            <div className={cx('task-status')}>
               <div>To do</div>
               <div>In progress</div>
               <div>Review</div>
               <div>Done</div>
            </div>
            <div className={cx('task-display')}>
               <div className={cx('main-task')}>Main Issue 1</div>
               <div className={cx('sub-tasks-container')}>
                  <div className={cx('sub-tasks')}>
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                  </div>
                  <div className={cx('sub-tasks')}>
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                  </div>
                  <div className={cx('sub-tasks')}>
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                  </div>
                  <div className={cx('sub-tasks')}>
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                     <Issue issueDetail={sampleIssue} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
