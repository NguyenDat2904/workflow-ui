import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '../BlackLog.module.scss';
import { AddIcon, DownIcon, MenuIcon } from '~/component/icon/icon';
import RowIssue from '../RowIssue/RowIssue';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import Dropdown from '~/component/dropdown/Dropdown';
import moment from 'moment';
import ModalCreateSprint from '../ModalCreateSprint/ModalCreateSprint';
import ModalCompleteSprint from '../ModalCompleteSprint/ModalCompleteSprint';
import { ProjectContext } from '~/contexts/project/projectContext';
import IssueService from '~/services/issue/issueService';
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import SprintService from '~/services/sprint/SprintService';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
const cx = classNames.bind(style);

function Sprint({ data, start = false, handleCreateSprint, setPrints, members }) {
   const { detailProject } = useContext(ProjectContext);

   const form = useForm({
      mode: 'all',
      defaultValues: {
         summary: '',
      },
   });
   // 1. State
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [isFocus, setIsFocus] = useState(true);
   const [isToggle, setIsToggle] = useState(false);
   const [isToggleComplete, setIsToggleComplete] = useState(false);
   const [isToggleAccept, setIsToggleAccept] = useState(false);
   const [isToggleIssue, setIsToggleIssue] = useState(false);
   const [isToggleStartSprint, setIsToggleStartSprint] = useState(false);

   const [valueTask, setValueTask] = useState({
      label: 'Story',
      key: 'USER_STORY',
      img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
   });

   const [issues, setIssues] = useState([]);

   const issueService = new IssueService();
   const sprintService = new SprintService();
   // 2. UseEffect
   useEffect(() => {
      getListIssue();
   }, []);
   // 3. Handle
   const handleDropDown = () => {
      setDropdownOpen(!isDropdownOpen);
      const dropdown = document.getElementById('dropdown');
      dropdown.setAttribute('data-drop-target-for-element', !isDropdownOpen);
   };

   // 3.1. GetIssue
   const getListIssue = async () => {
      if (detailProject.codeProject) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, { sprintID: data._id });
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
   // 3.2. Create issue
   const handleCreateIssue = async (dataForm) => {
      const dataIssue = {
         ...dataForm,
         issueType: valueTask.key,
         sprintID: data?._id,
      };
      const createIssue = await issueService.createIssue(detailProject?.codeProject, dataIssue);
      if (createIssue.status === 200) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, { sprintID: data._id });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
      form.reset();
   };
   // 4. Render
   const renderIssue = issues
      ?.map((issue) => {
         return <RowIssue key={issue._id} data={issue} setIssues={setIssues} sprintID={data._id} members={members} />;
      })
      .reverse();
   const formattedDateStart = moment(data.startDate).format('D MMM');
   const formattedDateEnd = moment(data.endDate).format('D MMM');
   return (
      <div className={cx('sprint-block')}>
         {isToggleComplete && (
            <ModalCompleteSprint isOpen={isToggleComplete} isClose={() => setIsToggleComplete(false)} />
         )}
         <div className={cx('sprint-header')}>
            <div
               className={cx('header-left')}
               id="dropdown"
               onClick={handleDropDown}
               data-drop-target-for-element={isDropdownOpen}
            >
               <Button
                  leftIcon={<DownIcon />}
                  backgroundNone
                  noChildren
                  noHover
                  style={{ cursor: 'pointer', height: '32px' }}
               ></Button>
               <div className={cx('name-sprint')}>{data.name}</div>
               <div className={cx('date-sprint')}>
                  {formattedDateStart} - {formattedDateEnd}
               </div>
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
                  {data.name !== 'Blacklog' ? (
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
                           <Button
                              style={{
                                 height: '32px',
                                 background: 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                              }}
                              disable
                           >
                              Start sprint
                           </Button>
                        )}

                        <Dropdown
                           className={cx('custom-dropdown')}
                           actions={[
                              { label: 'Edit sprint', method: () => setIsToggle(true) },
                              { label: 'Delete sprint', method: () => setIsToggleAccept(true) },
                           ]}
                        >
                           <Button
                              leftIcon={<MenuIcon />}
                              noChildren
                              style={{ cursor: 'pointer', height: '32px' }}
                           ></Button>
                        </Dropdown>
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
                              isOpen={isToggleAccept}
                              isClose={() => setIsToggleAccept(false)}
                              name={data.name}
                              title="Are you sure you want to delete sprint "
                              handleAccept={() => handleDeleteSprint(detailProject?.codeProject, data?._id)}
                           />
                        )}
                     </>
                  ) : (
                     <>
                        <Button style={{ cursor: 'pointer', height: '32px' }} onClick={handleCreateSprint}>
                           Create sprint
                        </Button>
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
                        style={{ minHeight: (data.name === 'Blacklog' || !start) && '1pc' }}
                     >
                        {data.name !== 'Blacklog' && start && <div className={cx('no-sprint-img')}></div>}
                        <div className={cx('no-sprint-text')}>
                           {data.name !== 'Blacklog' && start ? (
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
                  <div className={cx('create-btn')} onBlur={() => setIsFocus(false)}>
                     {isFocus ? (
                        <Button
                           leftIcon={<AddIcon />}
                           backgroundNone
                           viewAll
                           className={cx('custom-btn')}
                           onClick={() => setIsFocus(false)}
                        >
                           Create issue
                        </Button>
                     ) : (
                        <form action="" className={cx('form-issue')} onSubmit={form.handleSubmit(handleCreateIssue)}>
                           <ControllerForm form={form} name="summary">
                              <Input className={cx('custom-input')} autoFocus placeholder="What need to be done?" />
                           </ControllerForm>
                           <Button
                              className={cx('custom-button')}
                              rightIcon={<DownIcon />}
                              style={{ cursor: 'pointer', height: '24px', padding: '0 4px' }}
                              onClick={() => {
                                 setIsToggleIssue(!isToggleIssue);
                              }}
                              type="button"
                           >
                              <img
                                 src={
                                    valueTask?.img ||
                                    'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
                                 }
                                 alt=""
                              />
                           </Button>
                           {isToggleIssue && (
                              <ModalSelect
                                 width="160px"
                                 widthImg="24px"
                                 setValue={setValueTask}
                                 onClose={() => setIsToggleIssue(false)}
                                 data={[
                                    valueTask?.label !== 'Story'
                                       ? {
                                            label: 'Story',
                                            key: 'USER_STORY',
                                            img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
                                         }
                                       : null,
                                    valueTask?.label !== 'Bug'
                                       ? {
                                            label: 'Bug',
                                            key: 'BUG',
                                            img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
                                         }
                                       : null,
                                    valueTask?.label !== 'Task'
                                       ? {
                                            label: 'Task',
                                            key: 'TASK',
                                            img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
                                         }
                                       : null,
                                 ].filter((item) => item !== null)}
                              />
                           )}
                        </form>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Sprint;
