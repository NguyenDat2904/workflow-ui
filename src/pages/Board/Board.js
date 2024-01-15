import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';
import Issue from './Issue';
import WorkService from '~/services/work/workServices';
import { IssueIcon } from './IssueIcon';

const cx = classNames.bind(style);

export default function Board() {
   const BoardWorkService = new WorkService();
   const [listIssues, setListIssues] = useState({});
   const { projectKey } = useParams();
   console.log(projectKey);

   useEffect(() => {
      async function getIssues() {
         const listIssuesData = await BoardWorkService.getListIssuesOfBoard(projectKey, {});
         const listIssues = listIssuesData.data.issuesBroad;
         console.log(listIssuesData);
         const parentIssues = {};
         for (const issue of listIssues) {
            if (issue.parentIssue) {
               if (!parentIssues[issue.parentIssue._id])
                  parentIssues[issue.parentIssue._id] = {
                     ...issue.parentIssue,
                     subIssues: [],
                  };

               parentIssues[issue.parentIssue._id].subIssues.push(issue);
            }
         }
         setListIssues(parentIssues);
      }
      getIssues();
   }, []);

   const allIssues = {
      todo: [
         {
            summary: 'Sub Issue 1',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Low',
            type: 'Task',
         },
         {
            summary: 'Sub Issue [',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Highest',
            type: 'Bug',
         },
         {
            summary: 'Sub Issue 77',
            assignee: {
               name: 'Huy Van Hoang',
               img: 'https://i.pravatar.cc/300',
            },
            priority: 'Low',
            type: 'Epic',
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
            type: 'Story',
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
            type: 'Task',
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
            type: 'Task',
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
               {Object.keys(listIssues).map((key) => (
                  <div className={cx('main-task')}>{listIssues[key].summary}</div>
               ))}
               <div className={cx('main-task')}>
                  <IssueIcon type="task" style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span>Main Issue 1</span>
               </div>
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
