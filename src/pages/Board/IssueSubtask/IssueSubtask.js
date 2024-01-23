import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '~/pages/Board/Board.module.scss';
import Button from '~/component/Buttton/Button';
import { DownIcon, RightArrowIcon } from '~/component/icon/icon';
import IssueService from '~/services/issue/issueService';
import { Link, useParams } from 'react-router-dom';
import CardIssue from '../CardIssue/CardIssue';
const cx = classNames.bind(style);

function IssueSubtask({ issue, codeProject, getIssues, members }) {
   const param = useParams();
   const issueService = new IssueService();
   const [getIssueChildren, setIssueChildren] = useState([]);
   const [isToggleDownIssue, setIsToggleDownIssue] = useState(false);

   useEffect(() => {
      getIssueSubtask();
   }, [param]);

   const getIssueSubtask = async () => {
      if (issue?.parentIssue === null) {
         const issueChildren = await issueService.getIssue(param?.id, {
            parentIssueID: issue?._id,
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
               <div className={cx('section-board')} style={{ padding: '0px 0px 0 34px', height: '38px' }}>
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
                                    src="https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium"
                                    alt=""
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
                              <div className={cx('img-status')}>
                                 <span>{issue?.status}</span>
                              </div>
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
