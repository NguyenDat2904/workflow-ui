import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './RowIssue.module.scss';
import { DownIcon, TreeIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import IssueService from '~/services/issue/issueService';
import { ProjectContext } from '~/contexts/project/projectContext';

const cx = classNames.bind(style);
function RowIssue({ data, setIssues, sprintID, members }) {
   const { detailProject } = useContext(ProjectContext);

   const issueService = new IssueService();

   const [isToggleStatus, setIsToggleStatus] = useState(false);
   const [isTogglePrior, setIsTogglePrior] = useState(false);

   const handleChangePriority = async (key, id, option) => {
      const dataForm = { priority: option.label };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, { sprintID: sprintID });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
   };
   const handleChangeStatus = async (key, id, option) => {
      const dataForm = { status: option.key };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, { sprintID: sprintID });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
   };

   return (
      <div>
         <div className={cx('wrapper')}>
            <div className={cx('icon-issue')}>
               <img
                  src={
                     data.issueType === 'USER_STORY'
                        ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
                        : data.issueType === 'BUG'
                        ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
                        : data.issueType === 'TASK'
                        ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
                        : ''
                  }
                  alt=""
               />
            </div>
            <div className={cx('name-issue')}>{data.name}</div>
            <div className={cx('name-work')}>{data.summary}</div>
            <div className={cx('control-issue')}>
               <div className={cx('children-issue')}>
                  <TreeIcon />
               </div>
               <div style={{ minWidth: '100px', padding: '0px 12px', display: 'grid', gridTemplateColumns: '150px' }}>
                  <div>
                     <div className={cx('epic-issue')}>
                        <span className={cx('epic-text')}>TC-X19</span>
                     </div>
                  </div>
               </div>
               <div
                  style={{ display: 'grid', gridTemplateColumns: '150px' }}
                  className={cx('status-issue')}
                  onClick={() => setIsToggleStatus(!isToggleStatus)}
               >
                  <div>
                     {data.status === 'INPROGRESS' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-blue')}
                           style={{ height: '24px' }}
                        >
                           IN PROGRESS
                        </Button>
                     )}
                     {data.status === 'TODO' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-todo')}
                           style={{ height: '24px' }}
                        >
                           TODO
                        </Button>
                     )}
                     {data.status === 'REVIEW' && (
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           className={cx('custom-btn', 'btn-blue')}
                           style={{ height: '24px' }}
                        >
                           IN REVIEW
                        </Button>
                     )}
                     {data.status === 'DONE' && (
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
                        <ModalSelect
                           width="200px"
                           onClose={() => setIsToggleStatus(false)}
                           handleSubmit={(option) => handleChangeStatus(detailProject?.codeProject, data?._id, option)}
                           status
                           data={[
                              data.status !== 'TODO' ? { label: 'TO DO', key: 'TODO' } : null,
                              data.status !== 'INPROGRESS' ? { label: 'IN PROGRESS', key: 'INPROGRESS' } : null,
                              data.status !== 'REVIEW' ? { label: 'IN REVIEW', key: 'REVIEW' } : null,
                              data.status !== 'DONE' ? { label: 'DONE', key: 'DONE' } : null,
                           ].filter((item) => item !== null)}
                        />
                     )}
                  </div>
               </div>
               <div
                  style={{ display: 'grid' }}
                  className={cx('status-issue')}
                  onClick={() => setIsTogglePrior(!isTogglePrior)}
               >
                  <div className="flex-center">
                     <div
                        className={cx('priority')}
                        style={{
                           display: 'grid',
                           gridTemplateColumns: '20px',
                        }}
                     >
                        <img
                           src={
                              data.priority === 'Highest'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg'
                                 : data.priority === 'High'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/high.svg'
                                 : data.priority === 'Low'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/low.svg'
                                 : data.priority === 'Lowest'
                                 ? 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg'
                                 : 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg'
                           }
                           alt=""
                        />
                     </div>

                     {isTogglePrior && (
                        <ModalSelect
                           widthImg="24px"
                           width="160px"
                           handleSubmit={(option) =>
                              handleChangePriority(detailProject?.codeProject, data?._id, option)
                           }
                           onClose={() => setIsTogglePrior(false)}
                           data={[
                              data.priority !== 'Highest'
                                 ? {
                                      label: 'Highest',
                                      img: 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg',
                                   }
                                 : null,
                              data.priority !== 'High'
                                 ? {
                                      label: 'High',
                                      img: 'https://tcx19.atlassian.net/images/icons/priorities/high.svg',
                                   }
                                 : null,
                              data.priority !== 'Low'
                                 ? { label: 'Low', img: 'https://tcx19.atlassian.net/images/icons/priorities/low.svg' }
                                 : null,
                              data.priority !== 'Lowest'
                                 ? {
                                      label: 'Lowest',
                                      img: 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg',
                                   }
                                 : null,
                              data.priority !== 'Medium'
                                 ? {
                                      label: 'Medium',
                                      img: 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg',
                                   }
                                 : null,
                           ].filter((item) => item !== null)}
                        />
                     )}
                  </div>
               </div>
            </div>

            <div className={cx('user-assignee')}>
               <span className={cx('img-assignee')}>
                  <img
                     src={
                        data.assignee?.img
                           ? data.assignee?.img === ''
                              ? 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                              : data.assignee?.img
                           : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                     }
                     alt=""
                  />
                  {/* <ModalSelect
                     right="0"
                     widthImg="24px"
                     width="284px"
                     // handleSubmit={(option) => handleChangePriority(detailProject?.codeProject, data?._id, option)}
                     onClose={() => setIsTogglePrior(false)}
                     data={[]}
                  /> */}
               </span>
            </div>
         </div>
      </div>
   );
}

export default RowIssue;
