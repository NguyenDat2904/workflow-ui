import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import style from './Board.module.scss';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';
import WorkService from '~/services/work/workServices';
import { ProjectContext } from '~/contexts/project/projectContext';
import Button from '~/component/Buttton/Button';
import { DownIcon, RightArrowIcon } from '~/component/icon/icon';
import CardIssue from './CardIssue/CardIssue';
import IssueSubtask from './IssueSubtask/IssueSubtask';
import SprintService from '~/services/sprint/SprintService';
import ModalCompleteSprintBoard from '../BlackLog/ModalCompleteSprint/ModalCompleteSprintBoard';

const cx = classNames.bind(style);
export default function Board() {
   const { detailProject, members, setMembers } = useContext(ProjectContext);
   const BoardWorkService = new WorkService();
   const sprintService = new SprintService();

   const [allIssues, setAllIssues] = useState([]);
   const [allIssueFilter, setAllIssueFilter] = useState([]);
   const [isToggleComplete, setIsToggleComplete] = useState(false);
   const [checkedTypes, setCheckedTypes] = useState([]);
   const [selectedMembers, setSelectedMembers] = useState([]);
   const [isToggleAllIssue, setIsToggleAllIssue] = useState(true);
   const [sprints, setSprints] = useState([]);
   const { id } = useParams();

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

   const getListSprints = async () => {
      const listSprints = await sprintService.getSprint(id, { status: 'RUNNING' });
      if (listSprints.status === 200) setSprints(listSprints.data.sprint);
   };

   async function getIssuesFilter() {
      const assignee = selectedMembers?.map((item) => encodeURIComponent(item)).join('-');
      const listIssuesData = await BoardWorkService.getListIssuesOfBoard(id, {
         assignee: assignee ? assignee : null,
         ...params(),
      });
      if (listIssuesData.status === 200) {
         const listIssues = listIssuesData.data.issuesBroad;
         setAllIssueFilter(listIssues);
      }
   }
   async function getIssues() {
      const listIssuesData = await BoardWorkService.getListIssuesOfBoard(id, {});
      if (listIssuesData.status === 200) {
         const listIssues = listIssuesData.data.issuesBroad;
         setAllIssues(listIssues);
      }
   }
   async function getMembers() {
      if (detailProject.codeProject) {
         const listMembers = await BoardWorkService.getMember({ codeProject: detailProject?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   }
   useEffect(() => {
      getIssuesFilter();
   }, [detailProject, checkedTypes, selectedMembers]);
   useEffect(() => {
      getMembers();
      getIssues();
      getListSprints();
   }, [detailProject]);

   const rightSection = (
      <div>
         <Button
            blue
            onClick={() => {
               setIsToggleComplete(true);
            }}
            style={{ height: '32px', fontSize: '14px' }}
         >
            Complete Sprint
         </Button>
      </div>
   );

   const renderIssueAll = allIssues?.map((issue, index) => {
      return (
         <IssueSubtask
            key={issue?._id}
            issue={issue}
            index={index}
            codeProject={id}
            getIssues={getIssues}
            members={members}
            checkedTypes={checkedTypes}
            selectedMembers={selectedMembers}
            sprints={sprints}
         />
      );
   });

   const IssueTodo = allIssueFilter?.filter((issue) => issue?.status === 'TODO');
   const renderIssueTodo = IssueTodo?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={id}
            getIssues={getIssues}
            members={members}
            getIssuesFilter={getIssuesFilter}
         />
      );
   });
   const IssueProcess = allIssueFilter?.filter((issue) => issue?.status === 'INPROGRESS');
   const renderProcess = IssueProcess?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={id}
            getIssues={getIssues}
            members={members}
            getIssuesFilter={getIssuesFilter}
         />
      );
   });
   const IssueReview = allIssueFilter?.filter((issue) => issue?.status === 'REVIEW');
   const renderReview = IssueReview?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={id}
            getIssues={getIssues}
            members={members}
            getIssuesFilter={getIssuesFilter}
         />
      );
   });
   const IssueDone = allIssueFilter?.filter((issue) => issue?.status === 'DONE');
   const renderIssueDone = IssueDone?.map((issue) => {
      return (
         <CardIssue
            key={issue?._id}
            issue={issue}
            codeProject={id}
            getIssues={getIssues}
            members={members}
            getIssuesFilter={getIssuesFilter}
         />
      );
   });

   return (
      <div className={cx('board')}>
         <div className={cx('wrapper-board')}>
            {isToggleComplete && (
               <ModalCompleteSprintBoard
                  detailProject={detailProject}
                  isClose={() => setIsToggleComplete(false)}
                  isOpen={isToggleComplete}
                  sprints={sprints}
                  getIssuesFilter={getIssuesFilter}
                  getIssues={getIssues}
                  getListSprint={getListSprints}
               />
            )}
            <div style={{ padding: '0 40px' }}>
               <HeaderProject
                  headerName={'All sprint'}
                  checkedTypes={checkedTypes}
                  setCheckedTypes={setCheckedTypes}
                  rightSection={rightSection}
                  members={members}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
               />
            </div>
            <div style={{ display: 'flex', height: '100%' }}>
               <div style={{ width: '100%', position: 'relative', height: '100%' }}>
                  <div
                     style={{
                        '--board-scroll-element-height': '80',
                        willChange: 'opacity',
                        overflowX: 'auto',
                        overflowY: 'auto',
                        width: '100%',
                        position: 'relative',
                        maxHeight: 'calc(100vh - 220px)',
                     }}
                  >
                     <div
                        className={cx('section-board')}
                        style={{ padding: '0px 0px 0px 34px', position: 'sticky', top: '0', zIndex: '10' }}
                     >
                        <div className={cx('section-left')}></div>
                        <div style={{ flex: 'initial' }}>
                           <div style={{ display: 'flex', gap: '0px' }}>
                              <div className={cx('col-board')}>
                                 <div className={cx('col-board-main')}>
                                    <div className={cx('cgwwdw', 'gftcoT')}>
                                       <div
                                          className={cx('hSyVYa', 'hpIWPi')}
                                          style={{ flex: allIssues?.length !== 0 && '1' }}
                                       >
                                          <div className={cx('letSNF')}>
                                             <div className={cx('text-board')}>
                                                <div className={cx('dXSenY')}>
                                                   <h5>TO DO</h5>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {allIssues?.length === 0 && (
                                          <div className={cx('col-board-container')}>
                                             <div className={cx('col-board-content')}>
                                                <img
                                                   src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/agile.52407441.svg"
                                                   alt=""
                                                />
                                                <div className={cx('col-board-title')}>Get started in the backlog</div>
                                                <div className={cx('col-board-desc')}>
                                                   Plan and start a sprint to see issues here.
                                                </div>
                                                <Button to={`/project/${detailProject?.codeProject}/black-log`}>
                                                   Go to Backlog
                                                </Button>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className={cx('col-board')}>
                                 <div className={cx('col-board-main')}>
                                    <div className={cx('cgwwdw', 'gftcoT')}>
                                       <div
                                          className={cx('hSyVYa', 'hpIWPi')}
                                          style={{ flex: allIssues?.length !== 0 && '1' }}
                                       >
                                          <div className={cx('letSNF')}>
                                             <div className={cx('text-board')}>
                                                <div className={cx('dXSenY')}>
                                                   <h5>IN PROCESS</h5>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {allIssues?.length === 0 && (
                                          <div className={cx('col-board-container')}>
                                             <div className={cx('col-board-content')}></div>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className={cx('col-board')}>
                                 <div className={cx('col-board-main')}>
                                    <div className={cx('cgwwdw', 'gftcoT')}>
                                       <div
                                          className={cx('hSyVYa', 'hpIWPi')}
                                          style={{ flex: allIssues?.length !== 0 && '1' }}
                                       >
                                          <div className={cx('letSNF')}>
                                             <div className={cx('text-board')}>
                                                <div className={cx('dXSenY')}>
                                                   <h5>IN REVIEW</h5>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {allIssues?.length === 0 && (
                                          <div className={cx('col-board-container')}>
                                             <div className={cx('col-board-content')}></div>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                              <div className={cx('col-board')}>
                                 <div className={cx('col-board-main')}>
                                    <div className={cx('cgwwdw', 'gftcoT')}>
                                       <div
                                          className={cx('hSyVYa', 'hpIWPi')}
                                          style={{ flex: allIssues?.length !== 0 && '1' }}
                                       >
                                          <div className={cx('letSNF')}>
                                             <div className={cx('text-board')}>
                                                <div className={cx('dXSenY')}>
                                                   <h5>DONE</h5>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {allIssues?.length === 0 && (
                                          <div className={cx('col-board-container')}>
                                             <div className={cx('col-board-content')}></div>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     {renderIssueAll}
                     {allIssues?.length !== 0 && (
                        <div
                           className={cx('section-board')}
                           style={{
                              padding: '0px 0px 0px 34px',
                              height: '38px',
                              marginBottom: !isToggleAllIssue && '40px',
                           }}
                        >
                           <div className={cx('section-left')}></div>
                           <div style={{ flex: 'initial' }}>
                              <div style={{ display: 'flex', gap: '0px' }}>
                                 <div
                                    style={{ display: 'flex', gap: '0px' }}
                                    onClick={() => setIsToggleAllIssue(!isToggleAllIssue)}
                                 >
                                    <>
                                       {isToggleAllIssue ? (
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
                                       <div className={cx('img-summary')}>Everything else</div>
                                       <div className={cx('img-subtask')}>{`(${
                                          allIssueFilter?.length || '0'
                                       } issues)`}</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                     {isToggleAllIssue && allIssueFilter?.length > 0 && (
                        <div
                           className={cx('section-board')}
                           style={{
                              padding: '0px 0px 0px 34px',
                              marginBottom: isToggleAllIssue && '40px',
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
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
