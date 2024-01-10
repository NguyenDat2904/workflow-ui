import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';
import Issue from './Issue';

const cx = classNames.bind(style);

export default function Board() {
   const allIssues = {
      todo: [
         {
            summary: 'Sub Issue 1',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Low',
         },
         {
            summary: 'Sub Issue [',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Highest',
         },
         {
            summary: 'Sub Issue 77',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Low',
         },
      ],
      inProgress: [
         {
            summary: 'Sub Issue',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'High',
         },
      ],
      review: [
         {
            summary: 'Sub Issue',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Lowest',
         },
      ],
      done: [
         {
            summary: 'Sub Issue',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Medium',
         },
      ],
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
                     {allIssues.todo.map((issue, index) => (
                        <Issue key={index} issueDetail={issue} />
                     ))}
                  </div>
                  <div className={cx('sub-tasks')}>
                     {allIssues.inProgress.map((issue, index) => (
                        <Issue key={index} issueDetail={issue} />
                     ))}
                  </div>
                  <div className={cx('sub-tasks')}>
                     {allIssues.review.map((issue, index) => (
                        <Issue key={index} issueDetail={issue} />
                     ))}
                  </div>
                  <div className={cx('sub-tasks')}>
                     {allIssues.done.map((issue, index) => (
                        <Issue key={index} issueDetail={issue} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
