import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '~/pages/Board/Board.module.scss';
import Button from '~/component/Buttton/Button';
import { DownIcon, RightArrowIcon } from '~/component/icon/icon';
import IssueService from '~/services/issue/issueService';
import { Link, useParams } from 'react-router-dom';
import CardIssue from '../CardIssue/CardIssue';
import { Tooltip } from 'react-tooltip';
const cx = classNames.bind(style);

function IssueSubtask({
   issue,
   codeProject,
   getIssues,
   members,
   checkedTypes,
   selectedMembers,
   sprints,
   roleUser,
 
}) {
   const param = useParams();
   const issueService = new IssueService();
   const [getIssueChildren, setIssueChildren] = useState([]);
   const [isToggleDownIssue, setIsToggleDownIssue] = useState(false);

   const params = () => {
      const queryParams = {};
      checkedTypes?.forEach((element) => {
         if (element === 'BUG') {
            queryParams['typeBug'] = 'BUG';
         } else if (element === 'USER_STORY') {
            queryParams['typeUserStory'] = 'USER_STORY';
         } else if (element === 'TASK') {
            queryParams['typeTask'] = 'TASK';
         } else if (element === 'SUB_TASK') {
            queryParams['typeSubTask'] = 'SUB_TASK';
         }
      });
      return queryParams;
   };

   useEffect(() => {
      getIssueSubtask();
   }, [param, checkedTypes, selectedMembers]);

   const getIssueSubtask = async () => {
      const assignee = selectedMembers?.map((item) => encodeURIComponent(item)).join('-');
      if (issue?.parentIssue === null) {
         const issueChildren = await issueService.getIssue(param?.id, {
            assignee: assignee ? assignee : null,
            parentIssueID: issue?._id,
            ...params(),
         });
         if (issueChildren.status === 200) setIssueChildren(issueChildren.data.dataListIssues);
      }
   };
   const IssueTodo = getIssueChildren?.filter((issue) => issue?.status === 'TODO');
   const renderIssueTodo = IssueTodo?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={codeProject}
            getIssues={getIssues}
            getIssueSubtask={getIssueSubtask}
            members={members}
            roleUser={roleUser}
         />
      );
   });
   const IssueProcess = getIssueChildren?.filter((issue) => issue?.status === 'INPROGRESS');
   const renderProcess = IssueProcess?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={codeProject}
            getIssues={getIssues}
            getIssueSubtask={getIssueSubtask}
            members={members}
            roleUser={roleUser}
         />
      );
   });
   const IssueReview = getIssueChildren?.filter((issue) => issue?.status === 'REVIEW');
   const renderReview = IssueReview?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={codeProject}
            getIssues={getIssues}
            getIssueSubtask={getIssueSubtask}
            members={members}
            roleUser={roleUser}
         />
      );
   });
   const IssueDone = getIssueChildren?.filter((issue) => issue?.status === 'DONE');
   const renderIssueDone = IssueDone?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={codeProject}
            getIssues={getIssues}
            getIssueSubtask={getIssueSubtask}
            members={members}
            roleUser={roleUser}
         />
      );
   });
   const handleStopEvent = (event) => {
      event.stopPropagation();
   };
   const handleToggleDown = () => {
      setIsToggleDownIssue(!isToggleDownIssue);
   };

   return (
      <>
         {getIssueChildren?.length > 0 && (
            <>
               <div
                  className={cx('section-board')}
                  style={{
                     padding: '0px 0px 0 34px',
                     height: '38px',
                     position: 'sticky',
                     top: '48px',
                     zIndex: '10',
                     background: '#fff',
                  }}
               >
                  <div className={cx('section-left')}></div>
                  <div style={{ flex: '1' }}>
                     <div style={{ display: 'flex', gap: '0px', flex: '1' }}>
                        <div
                           style={{ display: 'flex', gap: '0px', flex: '1', cursor: 'pointer' }}
                           onClick={handleToggleDown}
                        >
                           <>
                              {isToggleDownIssue ? (
                                 <Button
                                    backgroundNone
                                    leftIcon={<DownIcon />}
                                    style={{ height: '24px', width: '24px' }}
                                 ></Button>
                              ) : (
                                 <Button
                                    backgroundNone
                                    leftIcon={<RightArrowIcon />}
                                    style={{ height: '24px', width: '24px' }}
                                 ></Button>
                              )}
                           </>
                           <div className={cx('bggktO')}>
                              <div className={cx('img-issue')}>
                                 <img
                                    data-tooltip-id="img-type-tooltip"
                                    data-tooltip-content={
                                       issue?.issueType === 'USER_STORY'
                                          ? 'Story'
                                          : issue?.issueType === 'BUG'
                                          ? 'Bug'
                                          : issue?.issueType === 'TASK'
                                          ? 'Task'
                                          : issue?.issueType === 'SUB_TASK'
                                          ? 'Subtask'
                                          : ''
                                    }
                                    data-tooltip-place="bottom"
                                    src={issue?.img}
                                    alt=""
                                 />
                                 <Tooltip
                                    id="img-type-tooltip"
                                    style={{
                                       backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                       color: 'var(--ds-text-inverse, #FFFFFF)',
                                       padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                       fontSize: 'var(--ds-font-size-075, 12px)',
                                       maxWidth: '140px',
                                       textAlign: 'center',
                                       fontWeight: '400',
                                    }}
                                 />
                              </div>
                              <Link
                                 target="_blank"
                                 to={`/projects/${codeProject}/issues/${issue?.name}`}
                                 onClick={handleStopEvent}
                              >
                                 <div className={cx('img-name')}>{issue?.name}</div>
                              </Link>
                              <div className={cx('img-summary')}>{issue?.summary}</div>
                              <div className={cx('img-subtask')}>{`(${getIssueChildren?.length || '0'} subtask)`}</div>
                              <div
                                 className={cx(
                                    'img-status',
                                    (issue?.status === 'INPROGRESS') | (issue?.status === 'REVIEW') && 'btn-blue',
                                    issue?.status === 'TODO' && 'btn-todo',
                                    issue?.status === 'DONE' && 'btn-done',
                                 )}
                              >
                                 <span>{issue?.status}</span>
                              </div>
                              <div
                                 className={cx('img-assignee')}
                                 data-tooltip-id="img-assignee-tooltip"
                                 data-tooltip-content={
                                    issue?.infoAssignee?.name ? issue?.infoAssignee?.name : 'Unassigned'
                                 }
                                 data-tooltip-place="bottom"
                              >
                                 <img
                                    src={
                                       issue?.infoAssignee?.img
                                          ? issue?.infoAssignee?.img
                                          : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                                    }
                                    alt=""
                                 />
                              </div>
                              <Tooltip
                                 id="img-assignee-tooltip"
                                 style={{
                                    backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                    color: 'var(--ds-text-inverse, #FFFFFF)',
                                    padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                    fontSize: 'var(--ds-font-size-075, 12px)',
                                    maxWidth: '140px',
                                    textAlign: 'center',
                                    fontWeight: '400',
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {isToggleDownIssue && (
                  <div
                     className={cx('section-board')}
                     style={{
                        padding: '0px 0px 0px 34px',
                     }}
                  >
                     <div className={cx('section-left')}></div>
                     <div style={{ flex: 'initial' }}>
                        <div style={{ display: 'flex', gap: '0px' }}>
                           <div className={cx('col-board')}>
                              <div className={cx('col-board-main')}>
                                 <div className={cx('cgwwdw', 'gftcoT')}>
                                    <div className={cx('col-board-container')}>{renderIssueTodo}</div>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('col-board')}>
                              <div className={cx('col-board-main')}>
                                 <div className={cx('cgwwdw', 'gftcoT')}>
                                    <div className={cx('col-board-container')}>{renderProcess}</div>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('col-board')}>
                              <div className={cx('col-board-main')}>
                                 <div className={cx('cgwwdw', 'gftcoT')}>
                                    <div className={cx('col-board-container')}>{renderReview}</div>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('col-board')}>
                              <div className={cx('col-board-main')}>
                                 <div className={cx('cgwwdw', 'gftcoT')}>
                                    <div className={cx('col-board-container')}>{renderIssueDone}</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </>
         )}
      </>
   );
}

export default IssueSubtask;
