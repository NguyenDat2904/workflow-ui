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
   const [listSingleIssues, setListSingleIssues] = useState([]);
   const { _id } = useParams();
   useEffect(() => {
      async function getIssues() {
         const listIssuesData = await BoardWorkService.getListIssuesOfBoard(_id, {});
         const listIssues = listIssuesData.data.issuesBroad;
         const parentIssues = {};
         const categorizedIssues = new Set();
         for (const issue of listIssues) {
            if (issue.parentIssue) {
               console.log(issue.parentIssue);
               if (!parentIssues[issue.parentIssue]) {
                  const parent = listIssues.filter((item) => item._id === issue.parentIssue)[0];
                  parentIssues[issue.parentIssue] = {
                     ...parent,
                     subIssues: [],
                  };
                  categorizedIssues.add(parent);
               }
               parentIssues[issue.parentIssue].subIssues.push(issue);
               categorizedIssues.add(issue);
            }
         }
         const uncategorizedIssues = listIssues.filter((issue) => !categorizedIssues.has(issue));
         setListIssues(parentIssues);
         console.log(uncategorizedIssues);
         setListSingleIssues(uncategorizedIssues);
      }
      getIssues();
   }, []);

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
                  <div key={key}>
                     <div className={cx('main-task')}>
                        <IssueIcon type={listIssues[key].issueType} style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span>{listIssues[key].summary}</span>
                     </div>
                     <div className={cx('sub-tasks-container')}>
                        <div className={cx('sub-tasks')}>
                           {listIssues[key].subIssues.map(
                              (issue, index) => issue.status === 'TODO' && <Issue key={index} issueDetail={issue} />,
                           )}
                        </div>
                        <div className={cx('sub-tasks')}>
                           {listIssues[key].subIssues.map(
                              (issue, index) =>
                                 issue.status === 'INPROGRESS' && <Issue key={index} issueDetail={issue} />,
                           )}
                        </div>
                        <div className={cx('sub-tasks')}>
                           {listIssues[key].subIssues.map(
                              (issue, index) => issue.status === 'REVIEW' && <Issue key={index} issueDetail={issue} />,
                           )}
                        </div>
                        <div className={cx('sub-tasks')}>
                           {listIssues[key].subIssues.map(
                              (issue, index) => issue.status === 'DONE' && <Issue key={index} issueDetail={issue} />,
                           )}
                        </div>
                     </div>
                  </div>
               ))}
               <div>
                  <div className={cx('main-task')}>
                     <IssueIcon type="EPIC" style={{ width: '1.5rem', height: '1.5rem' }} />
                     <span>Everything else</span>
                  </div>
                  <div className={cx('sub-tasks-container')}>
                     <div className={cx('sub-tasks', 'final')}>
                        {listSingleIssues.map(
                           (issue, index) => issue.status === 'TODO' && <Issue key={index} issueDetail={issue} />,
                        )}
                     </div>
                     <div className={cx('sub-tasks', 'final')}>
                        {listSingleIssues.map(
                           (issue, index) => issue.status === 'INPROGRESS' && <Issue key={index} issueDetail={issue} />,
                        )}
                     </div>
                     <div className={cx('sub-tasks', 'final')}>
                        {listSingleIssues.map(
                           (issue, index) => issue.status === 'REVIEW' && <Issue key={index} issueDetail={issue} />,
                        )}
                     </div>
                     <div className={cx('sub-tasks', 'final')}>
                        {listSingleIssues.map(
                           (issue, index) => issue.status === 'DONE' && <Issue key={index} issueDetail={issue} />,
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
