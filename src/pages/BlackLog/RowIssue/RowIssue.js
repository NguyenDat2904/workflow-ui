import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './RowIssue.module.scss';
import { DownIcon, MenuIcon, TreeIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import IssueService from '~/services/issue/issueService';
import { ProjectContext } from '~/contexts/project/projectContext';
import { Link } from 'react-router-dom';
import Modal from '~/component/Modal/Modal';
import Dropdown from '~/component/dropdown/Dropdown';
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import { Tooltip } from 'react-tooltip';
import ModalAcceptChangeParent from '~/component/ModalAcceptChangeParent/ModalAcceptChangeParent';

const cx = classNames.bind(style);
function RowIssue({
   data,
   setIssues,
   sprintID,
   members,
   children = false,
   setIssueChildren,
   idParent,
   title,
   getListIssue,
   roleUser,
}) {
   const { detailProject } = useContext(ProjectContext);

   const issueService = new IssueService();

   const [isToggleStatus, setIsToggleStatus] = useState(false);
   const [isTogglePrior, setIsTogglePrior] = useState(false);
   const [isToggleAssignee, setIsToggleAssignee] = useState(false);
   const [isDropDownMenu, setIsDropDownMenu] = useState(false);
   const [isChangeParent, setIsChangeParent] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const getListIssueSprint = async () => {
      // Get listIssue
      if (sprintID) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, {
            sprintID: title === 'Backlog' ? 'null' : sprintID,
         });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
   };

   const getListIssueChildren = async () => {
      // Get children
      if (idParent) {
         const issueChildren = await issueService.getIssue(detailProject?.codeProject, {
            parentIssueID: idParent,
         });
         if (issueChildren.status === 200)
            setIssueChildren(issueChildren.data?.dataListIssues.filter((item) => item.parentIssue !== null));
      }
   };

   const handleChangePriority = async (key, id, option) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const dataForm = { priority: option.label };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         getListIssueSprint();
         getListIssueChildren();
         if (title === 'Backlog') getListIssue();
      }
      setIsPending(false);
   };

   const handleChangeStatus = async (key, id, option) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const dataForm = { status: option.key };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         getListIssueSprint();
         getListIssueChildren();
         if (title === 'Backlog') getListIssue();
      }
      setIsPending(false);
   };
   const handleChangeAssignee = async (key, id, option) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const dataForm = { assignee: option.idUser };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         getListIssueSprint();
         getListIssueChildren();
         if (title === 'Backlog') getListIssue();
      }
      setIsPending(false);
   };
   const listMember = members?.map((member) => {
      return {
         idUser: member?._id,
         img:
            member?.img === ''
               ? 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
               : member?.img,
         label: member?.name,
      };
   });

   const handleDeleteIssue = async (codeProject, id_issue) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const deleteIssue = await issueService.deleteIssue(codeProject, id_issue);
      if (deleteIssue.status === 200) {
         getListIssueSprint();
         getListIssueChildren();
         if (title === 'Backlog') getListIssue();
      }
      setIsPending(false);
   };

   return (
      <div>
         <div className={cx('wrapper')}>
            <div
               className={cx('icon-issue')}
               data-tooltip-id="issueType-tooltip"
               data-tooltip-content={
                  data?.issueType === 'SUB_TASK'
                     ? 'Subtask'
                     : data?.issueType === 'TASK'
                     ? 'Task'
                     : data?.issueType === 'BUG'
                     ? 'Bug'
                     : data?.issueType === 'USER_STORY'
                     ? 'Story'
                     : ''
               }
               data-tooltip-place="top"
            >
               <img src={data?.img} alt="" />
            </div>
            <Tooltip
               id="issueType-tooltip"
               style={{
                  backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                  color: 'var(--ds-text-inverse, #FFFFFF)',
                  padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                  fontSize: 'var(--ds-font-size-075, 12px)',
                  maxWidth: '240px',
               }}
            />
            <div className={cx('name-issue', data?.issueType === 'SUB_TASK' && 'name-sub-task')}>
               <Link to={`/projects/${detailProject?.codeProject}/issues/${data?.name}`}>{data?.name}</Link>
            </div>
            <div className={cx('name-work')}>
               <Link to={`/projects/${detailProject?.codeProject}/issues/${data?.name}`}>{data?.summary}</Link>
            </div>
            <div className={cx('control-issue')}>
               {!children && <div className={cx('children-issue')}>{/* <TreeIcon /> */}</div>}
               {!children && (
                  <div
                     style={{ minWidth: '100px', padding: '0px 12px', display: 'grid', gridTemplateColumns: '150px' }}
                  >
                     <div>
                        <div className={cx('epic-issue')}>
                           <span className={cx('epic-text')}></span>
                        </div>
                     </div>
                  </div>
               )}
               <div
                  style={{ display: 'grid', gridTemplateColumns: '150px' }}
                  className={cx('status-issue')}
                  onClick={() => setIsToggleStatus(!isToggleStatus)}
               >
                  <div>
                     {data?.status === 'INPROGRESS' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-blue')}
                           style={{ height: '24px' }}
                        >
                           IN PROGRESS
                        </Button>
                     )}
                     {data?.status === 'TODO' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-todo')}
                           style={{ height: '24px' }}
                        >
                           TODO
                        </Button>
                     )}
                     {data?.status === 'REVIEW' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-blue')}
                           style={{ height: '24px' }}
                        >
                           IN REVIEW
                        </Button>
                     )}
                     {data?.status === 'DONE' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-done')}
                           style={{ height: '24px' }}
                        >
                           DONE
                        </Button>
                     )}
                     {isToggleStatus && (
                        <Modal isOpen={isToggleStatus} onClose={() => setIsToggleStatus(false)} relative>
                           <ModalSelect
                              width="200px"
                              onClose={() => setIsToggleStatus(false)}
                              handleSubmit={(option) =>
                                 handleChangeStatus(detailProject?.codeProject, data?._id, option)
                              }
                              active={
                                 data?.status === 'TODO'
                                    ? 'TO DO'
                                    : data?.status === 'INPROGRESS'
                                    ? 'IN PROGRESS'
                                    : data?.status === 'REVIEW'
                                    ? 'IN REVIEW'
                                    : data?.status === 'DONE'
                                    ? 'DONE'
                                    : ''
                              }
                              status
                              data={[
                                 data?.status !== 'TODO' ? { label: 'TO DO', key: 'TODO' } : null,
                                 data?.status !== 'INPROGRESS' ? { label: 'IN PROGRESS', key: 'INPROGRESS' } : null,
                                 data?.status !== 'REVIEW' ? { label: 'IN REVIEW', key: 'REVIEW' } : null,
                                 data?.status !== 'DONE' ? { label: 'DONE', key: 'DONE' } : null,
                              ].filter((item) => item !== null)}
                           />
                        </Modal>
                     )}
                  </div>
               </div>
               <div
                  style={{ display: 'grid' }}
                  className={cx('status-issue')}
                  onClick={() => setIsTogglePrior(!isTogglePrior)}
                  id="assignee-tooltip"
                  data-tooltip-id="priority-tooltip"
                  data-tooltip-content={data?.priority ? data?.priority : ''}
                  data-tooltip-place="bottom"
               >
                  <div className="flex-center">
                     <div
                        className={cx('priority')}
                        style={{
                           display: 'grid',
                           gridTemplateColumns: '18px',
                        }}
                     >
                        <img
                           src={
                              data?.priority === 'Highest'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg'
                                 : data?.priority === 'High'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/high.svg'
                                 : data?.priority === 'Low'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/low.svg'
                                 : data?.priority === 'Lowest'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg'
                                 : 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg'
                           }
                           alt=""
                        />
                     </div>
                     {isTogglePrior && (
                        <Modal relative isOpen={isTogglePrior} onClose={() => setIsTogglePrior(false)}>
                           <ModalSelect
                              widthImg="20px"
                              width="160px"
                              right="0"
                              handleSubmit={(option) =>
                                 handleChangePriority(detailProject?.codeProject, data?._id, option)
                              }
                              onClose={() => setIsTogglePrior(false)}
                              data={[
                                 data?.priority !== 'Highest'
                                    ? {
                                         label: 'Highest',
                                         img: 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg',
                                      }
                                    : null,
                                 data?.priority !== 'High'
                                    ? {
                                         label: 'High',
                                         img: 'https://tcx19.atlassian.net/images/icons/priorities/high.svg',
                                      }
                                    : null,
                                 data?.priority !== 'Low'
                                    ? {
                                         label: 'Low',
                                         img: 'https://tcx19.atlassian.net/images/icons/priorities/low.svg',
                                      }
                                    : null,
                                 data?.priority !== 'Lowest'
                                    ? {
                                         label: 'Lowest',
                                         img: 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg',
                                      }
                                    : null,
                                 data?.priority !== 'Medium'
                                    ? {
                                         label: 'Medium',
                                         img: 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg',
                                      }
                                    : null,
                              ].filter((item) => item !== null)}
                           />
                        </Modal>
                     )}
                  </div>
               </div>
               <Tooltip
                  id="priority-tooltip"
                  style={{
                     backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                     color: 'var(--ds-text-inverse, #FFFFFF)',
                     padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                     fontSize: 'var(--ds-font-size-075, 12px)',
                     maxWidth: '240px',
                  }}
               />
            </div>
            <div
               className={cx('user-assignee')}
               id="assignee-tooltip"
               data-tooltip-id="assignee-tooltip"
               data-tooltip-content={data?.infoAssignee?.name ? `Assignee: ${data?.infoAssignee?.name}` : 'Unassigned'}
               data-tooltip-place="bottom"
            >
               <span className={cx('img-assignee')}>
                  <div onClick={() => setIsToggleAssignee(!isToggleAssignee)} style={{ width: '100%', height: '100%' }}>
                     <img
                        src={
                           data?.infoAssignee?.img
                              ? data?.infoAssignee?.img === ''
                                 ? 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                                 : data?.infoAssignee?.img
                              : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                        }
                        alt=""
                     />
                  </div>
                  {isToggleAssignee && (
                     <Modal relative isOpen={isToggleAssignee} onClose={() => setIsToggleAssignee(false)}>
                        <ModalSelect
                           right="0"
                           widthImg="24px"
                           width="284px"
                           heightRow="48px"
                           percent50
                           handleSubmit={(option) =>
                              handleChangeAssignee(detailProject?.codeProject, data?._id, option)
                           }
                           onClose={() => setIsToggleAssignee(false)}
                           data={listMember}
                        />
                     </Modal>
                  )}
               </span>
            </div>
            <Tooltip
               id="assignee-tooltip"
               style={{
                  backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                  color: 'var(--ds-text-inverse, #FFFFFF)',
                  padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                  fontSize: 'var(--ds-font-size-075, 12px)',
                  maxWidth: '240px',
               }}
            />
            <div className={cx('menu-issue')}>
               <Dropdown
                  className={cx('custom-dropdown')}
                  actions={[
                     data.issueType === 'SUB_TASK'
                        ? { label: 'Change parent', method: () => setIsChangeParent(true) }
                        : undefined,
                     { label: 'Delete issue', method: () => setIsDropDownMenu(true) },
                  ]}
               >
                  <Button backgroundNone leftIcon={<MenuIcon />} style={{ height: '32px' }}></Button>
               </Dropdown>
            </div>
            {isChangeParent && (
               <ModalAcceptChangeParent
                  isOpen={isChangeParent}
                  isClose={() => setIsChangeParent(false)}
                  headerTitle={`Change parent`}
                  blue
                  title={title}
                  getListIssueChildren={getListIssueChildren}
                  getListIssueSprint={getListIssueSprint}
                  getListIssue={getListIssue}
                  data={data}
                  setIsChangeParent={setIsChangeParent}
               />
            )}
            {isDropDownMenu && (
               <ModalAccept
                  btn="Delete"
                  headerTitle={`Delete ${data?.name}?`}
                  isOpen={isDropDownMenu}
                  isClose={() => setIsDropDownMenu(false)}
                  title="You're about to permanently delete this issue, its comments and attachments, and all of its data."
                  handleAccept={() => handleDeleteIssue(detailProject?.codeProject, data?._id)}
               />
            )}
         </div>
      </div>
   );
}

export default RowIssue;
