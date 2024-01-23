import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './CardIssue.module.scss';
import Button from '~/component/Buttton/Button';
import { MenuIcon } from '~/component/icon/icon';
import { Link } from 'react-router-dom';
import Dropdown from '~/component/dropdown/Dropdown';
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import ModalAcceptChangeParent from '~/component/ModalAcceptChangeParent/ModalAcceptChangeParent';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import Modal from '~/component/Modal/Modal';
import IssueService from '~/services/issue/issueService';
const cx = classNames.bind(style);

function CardIssue({ issue, codeProject, getIssues, getIssueSubtask, members }) {
   const issueService = new IssueService();

   const [isPending, setIsPending] = useState(false);

   const [isToggleAcceptDelete, setIsToggleAcceptDelete] = useState(false);
   const [isChangeParent, setIsChangeParent] = useState(false);
   const [isToggleStatus, setIsToggleStatus] = useState(false);
   const [isToggleAssignee, setIsToggleAssignee] = useState(false);

   const handleChangeStatus = async (key, id, option) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const dataForm = { status: option.key };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         getIssues();
         if (getIssueSubtask) getIssueSubtask();
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
         getIssues();
         if (getIssueSubtask) getIssueSubtask();
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

   // 3.11 Submit Delete Submit
   const handleDeleteIssue = async (codeProject, id_issue) => {
      if (isPending) {
         return;
      }
      setIsPending(true);
      const deleteIssue = await issueService.deleteIssue(codeProject, id_issue);
      if (deleteIssue.status === 200) {
         getIssues();
         if (getIssueSubtask) getIssueSubtask();
      }
      setIsPending(false);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('card-content')}>
               <div className={cx('card-top')}>
                  <Link target="_blank" to={`/projects/${codeProject}/issues/${issue?.name}`}>
                     <div className={cx('card-summary')}>{issue?.summary}</div>
                  </Link>
                  <Dropdown
                     actions={[
                        { label: 'Change parent', method: () => setIsChangeParent(true) },
                        {
                           label: 'Delete issue',
                           method: () => setIsToggleAcceptDelete(true),
                        },
                     ]}
                  >
                     <Button leftIcon={<MenuIcon />} style={{ height: '32px', width: '32px' }}></Button>
                  </Dropdown>
                  {isToggleAcceptDelete && (
                     <ModalAccept
                        btn="Delete"
                        headerTitle={`Delete ${issue?.name}?`}
                        isOpen={isToggleAcceptDelete}
                        isClose={() => setIsToggleAcceptDelete(false)}
                        title="You're about to permanently delete this issue, its comments and attachments, and all of its data."
                        handleAccept={() => handleDeleteIssue(codeProject, issue?._id)}
                     />
                  )}
                  {isChangeParent && (
                     <ModalAcceptChangeParent
                        isOpen={isChangeParent}
                        isClose={() => setIsChangeParent(false)}
                        headerTitle={`Change parent`}
                        blue
                        // getIssueDetail={getIssueDetail}
                        data={issue}
                        setIsChangeParent={setIsChangeParent}
                     />
                  )}
               </div>
               <div className={cx('card-bottom')}>
                  <div className={cx('card-bottom-row')}>
                     <div className={cx('card-issue-name')}>
                        <div className={cx('card-issue-img')}>
                           <img src={issue?.img} alt="" />
                        </div>
                        <div className={cx('issue-name')}>
                           <Link target="_blank" to={`/projects/${codeProject}/issues/${issue?.name}`}>
                              <span>{issue?.name}</span>
                           </Link>
                        </div>
                     </div>
                     <div className={cx('card-issue-name')}>
                        <div className={cx('issue-status')} onClick={() => setIsToggleStatus(!isToggleStatus)}>
                           <span>{issue?.status}</span>
                           {isToggleStatus && (
                              <Modal isOpen={isToggleStatus} onClose={() => setIsToggleStatus(false)} relative>
                                 <ModalSelect
                                    width="150px"
                                    onClose={() => setIsToggleStatus(false)}
                                    handleSubmit={(option) => handleChangeStatus(codeProject, issue?._id, option)}
                                    status
                                    data={[
                                       issue?.status !== 'TODO' ? { label: 'TO DO', key: 'TODO' } : null,
                                       issue?.status !== 'INPROGRESS'
                                          ? { label: 'IN PROGRESS', key: 'INPROGRESS' }
                                          : null,
                                       issue?.status !== 'REVIEW' ? { label: 'IN REVIEW', key: 'REVIEW' } : null,
                                       issue?.status !== 'DONE' ? { label: 'DONE', key: 'DONE' } : null,
                                    ].filter((item) => item !== null)}
                                 />
                              </Modal>
                           )}
                        </div>
                        <div
                           className={cx('card-issue-assignee')}
                           onClick={() => setIsToggleAssignee(!isToggleAssignee)}
                        >
                           <img
                              src={
                                 issue?.infoAssignee?.img
                                    ? issue?.infoAssignee?.img
                                    : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                              }
                              alt=""
                           />
                           {isToggleAssignee && (
                              <Modal relative isOpen={isToggleAssignee} onClose={() => setIsToggleAssignee(false)}>
                                 <ModalSelect
                                    left="0"
                                    widthImg="24px"
                                    width="284px"
                                    heightRow="48px"
                                    percent50
                                    handleSubmit={(option) => handleChangeAssignee(codeProject, issue?._id, option)}
                                    onClose={() => setIsToggleAssignee(false)}
                                    data={listMember}
                                 />
                              </Modal>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CardIssue;
