import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '../BlackLog.module.scss';
import { AddIcon, DownIcon, MenuIcon, RightArrowIcon } from '~/component/icon/icon';
import RowIssue from '../RowIssue/RowIssue';
import Button from '~/component/Buttton/Button';
import Dropdown from '~/component/dropdown/Dropdown';
import moment from 'moment';
import ModalCreateSprint from '../ModalCreateSprint/ModalCreateSprint';
import ModalCompleteSprint from '../ModalCompleteSprint/ModalCompleteSprint';
import { ProjectContext } from '~/contexts/project/projectContext';
import IssueService from '~/services/issue/issueService';
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import SprintService from '~/services/sprint/SprintService';
import CreateIssue from './CreateIssue/CreateIssue';
import Modal from '~/component/Modal/Modal';
import { Tooltip } from 'react-tooltip';
const cx = classNames.bind(style);

function Sprint({
   data = [],
   start = false,
   handleCreateSprint,
   setPrints,
   members,
   checkedTypes,
   selectedMembers,
   title,
   sprints,
   roleUser = {},
}) {
   const { detailProject } = useContext(ProjectContext);
   // 1. State
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [isFocus, setIsFocus] = useState(true);
   const [isToggle, setIsToggle] = useState(false);
   const [isToggleComplete, setIsToggleComplete] = useState(false);
   const [isToggleAccept, setIsToggleAccept] = useState(false);
   const [isToggleStartSprint, setIsToggleStartSprint] = useState(false);
   const [issues, setIssues] = useState([]);
   const issueService = new IssueService();
   const sprintService = new SprintService();
   // 2. UseEffect
   useEffect(() => {
      getListIssue();
   }, [checkedTypes, selectedMembers, sprints]);
   // 3. Handle
   const handleDropDown = () => {
      setDropdownOpen(!isDropdownOpen);
      const dropdown = document.getElementById('dropdown');
      dropdown.setAttribute('data-drop-target-for-element', !isDropdownOpen);
   };

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
   // 3.1. GetIssue
   const getListIssue = async () => {
      const assignee = selectedMembers?.map((item) => encodeURIComponent(item)).join('-');
      if (detailProject?.codeProject) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, {
            sprintID: title === 'Backlog' ? 'null' : data._id,
            assignee: assignee ? assignee : null,
            parentIssueID: 'null',
            ...params(),
         });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
   };
   // 3.2. DeleSprint
   const handleDeleteSprint = async (key, id) => {
      const deleteSprint = await sprintService.deleteSprint(key, id);
      if (deleteSprint.status === 200) {
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200) setPrints(listPrints.data.sprint);
      }
   };

   useEffect(() => {
      if (title === 'Backlog') setDropdownOpen(true);
      if (start) setDropdownOpen(true);
   }, []);

   // 4. Render
   const renderIssue = issues
      ?.map((issue) => {
         return (
            <RowIssue
               roleUser={roleUser}
               title={title}
               key={issue._id}
               data={issue}
               setIssues={setIssues}
               sprintID={data._id}
               members={members}
               getListIssue={getListIssue}
            />
         );
      })
      .reverse();
   const formattedDateStart = moment(data.startDate).format('D MMM');
   const formattedDateEnd = moment(data.endDate).format('D MMM');
   return (
      <div className={cx('sprint-block')}>
         {isToggleComplete && (
            <ModalCompleteSprint
               data={data}
               issues={issues}
               isOpen={isToggleComplete}
               isClose={() => setIsToggleComplete(false)}
               sprints={sprints}
               detailProject={detailProject}
               getListIssue={getListIssue}
               setPrints={setPrints}
            />
         )}
         <div className={cx('sprint-header')}>
            <div
               className={cx('header-left')}
               id="dropdown"
               onClick={handleDropDown}
               data-drop-target-for-element={isDropdownOpen}
            >
               <Button
                  leftIcon={isDropdownOpen ? <DownIcon /> : <RightArrowIcon />}
                  backgroundNone
                  noChildren
                  noHover
                  style={{ cursor: 'pointer', height: '32px' }}
               ></Button>
               <div className={cx('name-sprint')}>{title === 'Backlog' ? 'Backlog' : data.name}</div>
               {title !== 'Backlog' && (
                  <div className={cx('date-sprint')}>
                     {formattedDateStart} - {formattedDateEnd}
                  </div>
               )}
               <div className={cx('date-sprint')}>({issues?.length ? issues?.length : '0'} issues)</div>
            </div>
            <div className={cx('header-right')}>
               <span className={cx('number-issue', 'color-issue-todo')}>
                  <span>{issues.filter((item) => item.status === 'TODO')?.length || 0}</span>
               </span>
               <span className={cx('number-issue', 'color-issue-process')}>
                  <span>
                     {issues.filter((item) => item.status === 'INPROGRESS' || item.status === 'REVIEW')?.length || 0}
                  </span>
               </span>
               <span className={cx('number-issue', 'color-issue-done')}>
                  <span>{issues.filter((item) => item.status === 'DONE')?.length || 0}</span>
               </span>
               <div className={cx('setting-issue')}>
                  {title === 'Backlog' ? (
                     <>
                        <Button
                           data-tooltip-id="create-sprint-tooltip"
                           data-tooltip-content="You are not an admin or a manager."
                           data-tooltip-place="top"
                           disable={roleUser?.role === 'member'}
                           style={{
                              cursor: roleUser?.role !== 'member' ? 'pointer' : 'not-allowed',
                              height: '32px',
                              background: 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                           }}
                           onClick={() => {
                              if (roleUser?.role !== 'member') handleCreateSprint();
                           }}
                        >
                           Create sprint
                        </Button>
                        {roleUser?.role === 'member' && (
                           <Tooltip
                              id="create-sprint-tooltip"
                              style={{
                                 backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                 color: 'var(--ds-text-inverse, #FFFFFF)',
                                 padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                 fontSize: 'var(--ds-font-size-075, 12px)',
                                 maxWidth: '140px',
                                 textAlign: 'center',
                              }}
                           />
                        )}
                     </>
                  ) : (
                     <>
                        {data.status === 'RUNNING' && (
                           <>
                              <Button
                                 style={{ cursor: 'pointer', height: '32px' }}
                                 onClick={() => setIsToggleComplete(true)}
                              >
                                 Complete sprint
                              </Button>
                           </>
                        )}
                        {data.status === 'PENDING' && issues?.length !== 0 && (
                           <>
                              <Button
                                 style={{ cursor: 'pointer', height: '32px' }}
                                 blue
                                 onClick={() => setIsToggleStartSprint(true)}
                              >
                                 Start sprint
                              </Button>
                              {isToggleStartSprint && (
                                 <ModalCreateSprint
                                    btn_acpt="Start"
                                    data={data}
                                    isOpen={isToggleStartSprint}
                                    isClose={() => setIsToggleStartSprint(false)}
                                    keyProject={detailProject?.codeProject}
                                    setPrints={setPrints}
                                 />
                              )}
                           </>
                        )}
                        {data.status === 'PENDING' && issues?.length === 0 && (
                           <>
                              <Button
                                 data-tooltip-id="start-sprint-tooltip"
                                 data-tooltip-content="Sprint cannot be started because it contains no issues"
                                 data-tooltip-place="top"
                                 style={{
                                    height: '32px',
                                    background: 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                                 }}
                                 disable
                              >
                                 Start sprint
                              </Button>
                              <Tooltip
                                 id="start-sprint-tooltip"
                                 style={{
                                    backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                    color: 'var(--ds-text-inverse, #FFFFFF)',
                                    padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                    fontSize: 'var(--ds-font-size-075, 12px)',
                                    maxWidth: '240px',
                                    textAlign: 'center',
                                 }}
                              />
                           </>
                        )}
                        <Dropdown
                           isClose={roleUser?.role === 'member'}
                           className={cx('custom-dropdown')}
                           actions={[
                              { label: 'Edit sprint', method: () => setIsToggle(true) },
                              { label: 'Delete sprint', method: () => setIsToggleAccept(true) },
                           ]}
                        >
                           <Button
                              data-tooltip-id="edit-sprint-tooltip"
                              data-tooltip-content="You are not an admin or a manager."
                              data-tooltip-place="top"
                              leftIcon={<MenuIcon />}
                              disable={roleUser?.role === 'member'}
                              style={{
                                 cursor: roleUser?.role !== 'member' ? 'pointer' : 'not-allowed',
                                 height: '32px',
                                 background: 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                                 padding: '0 4px',
                              }}
                           ></Button>
                        </Dropdown>
                        {roleUser?.role === 'member' && (
                           <Tooltip
                              id="edit-sprint-tooltip"
                              style={{
                                 backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                 color: 'var(--ds-text-inverse, #FFFFFF)',
                                 padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                 fontSize: 'var(--ds-font-size-075, 12px)',
                                 maxWidth: '140px',
                                 textAlign: 'center',
                              }}
                           />
                        )}
                        {isToggle && (
                           <ModalCreateSprint
                              btn_acpt="Update"
                              data={data}
                              isOpen={isToggle}
                              isClose={() => setIsToggle(false)}
                              keyProject={detailProject?.codeProject}
                              setPrints={setPrints}
                           />
                        )}
                        {isToggleAccept && (
                           <ModalAccept
                              btn="Delete"
                              headerTitle="Delete sprint"
                              isOpen={isToggleAccept}
                              isClose={() => setIsToggleAccept(false)}
                              name={data.name}
                              title="Are you sure you want to delete sprint "
                              handleAccept={() => handleDeleteSprint(detailProject?.codeProject, data?._id)}
                           />
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>
         {isDropdownOpen && (
            <div className={cx('sprint-main')}>
               {issues?.length === 0 ? (
                  <div className={cx('no-sprint')}>
                     <div
                        className={cx('no-sprint-content')}
                        style={{ minHeight: (data.name === 'Backlog' || !start) && '1pc' }}
                     >
                        {data.name !== 'Backlog' && start && <div className={cx('no-sprint-img')}></div>}
                        <div className={cx('no-sprint-text')}>
                           {data.name !== 'Backlog' && start ? (
                              <>
                                 <p>Plan your sprint</p>
                                 <div>
                                    Drag issues from the <b>Backlog</b> section, or create new issues, to plan the work
                                    for this sprint. Select <b>Start sprint</b> when you're ready.
                                 </div>
                              </>
                           ) : (
                              <div style={{ fontSize: '11px' }}>Your backlog is empty.</div>
                           )}
                        </div>
                     </div>
                  </div>
               ) : (
                  <>{renderIssue}</>
               )}
               <div className={cx('create-issue')}>
                  <div className={cx('create-btn')}>
                     {isFocus ? (
                        <Button
                           leftIcon={<AddIcon />}
                           backgroundNone
                           viewAll
                           className={cx('custom-btn')}
                           onClick={() => {
                              if (roleUser.role !== 'member') setIsFocus(false);
                           }}
                        >
                           Create issue
                        </Button>
                     ) : (
                        <>
                           <Modal isOpen={true} relative onClose={() => setIsFocus(true)}>
                              <CreateIssue
                                 title={title}
                                 setIssues={setIssues}
                                 idPrint={data?._id}
                                 paramsFunc={params}
                              />
                           </Modal>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Sprint;
