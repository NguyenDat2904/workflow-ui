import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';
import Issue from './Issue';
import WorkService from '~/services/work/workServices';
import { IssueIcon } from './IssueIcon';
import ModalCompleteSprint from '../BlackLog/ModalCompleteSprint/ModalCompleteSprint';
import { ProjectContext } from '~/contexts/project/projectContext';

const cx = classNames.bind(style);

export default function Board() {
   const { detailProject, members, setMembers } = useContext(ProjectContext);
   const BoardWorkService = new WorkService();

   const [allIssues, setAllIssues] = useState([]);
   const [listIssues, setListIssues] = useState({});
   const [listSingleIssues, setListSingleIssues] = useState([]);
   const [isToggleComplete, setIsToggleComplete] = useState(false);
   const [checkedTypes, setCheckedTypes] = useState([]);
   const [selectedMembers, setSelectedMembers] = useState([]);
   const { id } = useParams();

   async function getIssues() {
      const listIssuesData = await BoardWorkService.getListIssuesOfBoard(id, {});
      const listIssues = listIssuesData.data.issuesBroad;
      const parentIssues = {};
      const categorizedIssues = new Set();
      for (const issue of listIssues) {
         if (issue.parentIssue) {
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
      setAllIssues(listIssues);
      setListIssues(parentIssues);
      setListSingleIssues(uncategorizedIssues);
   }

   async function getMembers() {
      if (detailProject.codeProject) {
         const listMembers = await BoardWorkService.getMember({ codeProject: detailProject?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   }
   useEffect(() => {
      getIssues();
      getMembers();
   }, [detailProject]);

   useEffect(() => {
      console.log(checkedTypes);
   }, [checkedTypes]);

   const rightSection = (
      <div className={cx('sprint-buttons')}>
         <Button
            buttonStyle="filled"
            onClick={() => {
               setIsToggleComplete(true);
            }}
         >
            Complete Sprint
         </Button>
         {/* <Button>Edit Sprint</Button> */}
      </div>
   );

   function mappingSubIssue(issuesList, status) {
      if (checkedTypes.length === 0) {
         return issuesList
            .filter((issue) => issue.status === status)
            .map((issue, index) => <Issue key={index} projectId={id} issueDetail={issue} />);
      }

      return issuesList
         .filter((issue) => checkedTypes.includes(issue.issueType))
         .map((issue, index) => issue.status === status && <Issue key={index} projectId={id} issueDetail={issue} />);
   }

   return (
      <div className={cx('board')}>
         {isToggleComplete && (
            <ModalCompleteSprint
               detailProject={detailProject}
               isClose={() => setIsToggleComplete(false)}
               isOpen={isToggleComplete}
               issues={allIssues}
            />
         )}
         <HeaderProject
            headerName={'Board'}
            checkedTypes={checkedTypes}
            setCheckedTypes={setCheckedTypes}
            rightSection={rightSection}
            members={members}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
         />
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
                        <span style={{ color: 'gray', fontWeight: '400' }}>{listIssues[key].name}</span>
                        <span>{listIssues[key].summary}</span>
                        <span style={{ color: 'gray', fontWeight: '400' }}>
                           ({listIssues[key].subIssues.length} subtasks)
                        </span>
                     </div>
                     <div className={cx('sub-tasks-container')}>
                        <div className={cx('sub-tasks')}>{mappingSubIssue(listIssues[key].subIssues, 'TODO')}</div>
                        <div className={cx('sub-tasks')}>
                           {mappingSubIssue(listIssues[key].subIssues, 'INPROGRESS')}
                        </div>
                        <div className={cx('sub-tasks')}>{mappingSubIssue(listIssues[key].subIssues, 'REVIEW')}</div>
                        <div className={cx('sub-tasks')}>{mappingSubIssue(listIssues[key].subIssues, 'DONE')}</div>
                     </div>
                  </div>
               ))}
               <div>
                  <div className={cx('main-task')}>
                     <IssueIcon type="EPIC" style={{ width: '1.5rem', height: '1.5rem' }} />
                     <span>Everything else</span>
                     <span style={{ color: 'gray', fontWeight: '400' }}>({listSingleIssues.length} subtasks)</span>
                  </div>
                  <div className={cx('sub-tasks-container')}>
                     <div className={cx('sub-tasks', 'final')}>{mappingSubIssue(listSingleIssues, 'TODO')}</div>
                     <div className={cx('sub-tasks', 'final')}>{mappingSubIssue(listSingleIssues, 'INPROGRESS')}</div>
                     <div className={cx('sub-tasks', 'final')}>{mappingSubIssue(listSingleIssues, 'REVIEW')}</div>
                     <div className={cx('sub-tasks', 'final')}>{mappingSubIssue(listSingleIssues, 'DONE')}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
