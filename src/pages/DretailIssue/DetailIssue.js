import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './DetailIssue.module.scss';
import NavUrl from '~/component/NavUrl/NavUrl';
import Button from '~/component/Buttton/Button';
import { AddIcon, DownIcon, MenuIcon, TreeIcon } from '~/component/icon/icon';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import TinyText from '~/component/TinyText/TinyText';
import RowIssue from '../BlackLog/RowIssue/RowIssue';
import { useParams } from 'react-router-dom';
import IssueService from '~/services/issue/issueService';
import CreateIssue from '../BlackLog/Sprint/CreateIssue/CreateIssue';
import Modal from '~/component/Modal/Modal';
import DOMPurify from 'dompurify';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import SprintService from '~/services/sprint/SprintService';
import moment from 'moment';
const cx = classNames.bind(style);
function DetailIssue() {
   const param = useParams();
   const issueService = new IssueService();
   const sprintService = new SprintService();

   // 1. State
   const [detailIssue, setDetailIssue] = useState({});
   const [detailIssueParent, setDetailIssueParent] = useState({});
   const [issueChildren, setIssueChildren] = useState([]);
   const [sprints, setSprints] = useState([]);
   const [isToggleCreateIssue, setIsToggleCreateIssue] = useState(false);
   const [isToggleDesc, setIsToggleDesc] = useState(false);
   const [valueDesc, setValueDesc] = useState('');
   const [isToggleStatus, setIsToggleStatus] = useState(false);
   const [isToggleSprint, setIsToggleSprint] = useState(false);
   const [isTogglePrior, setIsTogglePrior] = useState(false);

   const form = useForm({
      mode: 'all',
      defaultValues: {
         storyPointEstimate: detailIssue.storyPointEstimate,
         startDate: null,
         dueDate: null,
         description: '',
         'button-desc': '',
         comment: '',
      },
   });
   // 2. UseEffect
   useEffect(() => {
      getIssueDetail();
      getListSprint();
   }, [param]);
   useEffect(() => {
      form.setValue('storyPointEstimate', detailIssue?.storyPointEstimate);
      form.setValue('startDate', detailIssue?.startDate?.slice(0, 16));
      form.setValue('dueDate', detailIssue?.dueDate?.slice(0, 16));
   }, [detailIssue]);
   // 3.1 get issue detail
   const getIssueDetail = async () => {
      const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
      if (issues.status === 200) {
         setDetailIssue(issues.data);
         if (issues.data.parentIssue === null) {
            const issueChildren = await issueService.getIssue(param?.id, {
               parentIssueID: issues.data.parentIssue,
            });
            if (issueChildren.status === 200)
               setIssueChildren(issueChildren.data.dataListIssues.filter((item) => item.parentIssue !== null));
         } else if (issues.data.parentIssue) {
            const issueParent = await issueService.getIssueDetail(param?.id, { search: issues.data.parentIssue });
            if (issueParent.status === 200) setDetailIssueParent(issueParent.data);
         }
      }
   };
   // 3.2 Submit desc
   const handleSubmitDesc = async (key, id, option) => {
      const updateIssue = await issueService.updateIssue(key, id, option);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
   };
   // 3.3 ChangeStatus
   const handleChangeStatus = async (key, id, option) => {
      const dataForm = { status: option.key };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
   };

   // 3.4 Get List Sprint
   const getListSprint = async () => {
      const listPrints = await sprintService.getSprint(param?.id);
      if (listPrints.status === 200) {
         setSprints(listPrints.data.sprint);
      }
   };
   const dataLabelSprint = sprints?.map((sprint) => {
      return { label: sprint?.name, key: sprint?._id };
   });

   // 3.5 Change Issue to Sprint
   const handleChangeSprint = async (keyProject, id, option) => {
      const dataForm = { sprint: option.key };
      const updateIssue = await issueService.updateIssue(keyProject, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
   };

   // 3.6 Submit Ponit
   const handleSubmitPoint = async (dataPoint) => {
      const dataForm = { storyPointEstimate: +dataPoint?.storyPointEstimate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('storyPointEstimate', issues.data.storyPointEstimate);
         }
      }
   };
   const handleBlur = () => {
      // Gọi hàm submit khi trường input bị mất trỏ chuột
      form.handleSubmit(handleSubmitStartDate)();
   };
   const handleBlurEnd = () => {
      // Gọi hàm submit khi trường input bị mất trỏ chuột
      form.handleSubmit(handleSubmitEndDate)();
   };

   // 3.7 Submit Start
   const handleSubmitStartDate = async (dataDate) => {
      const dataForm = { startDate: dataDate?.startDate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('startDate', issues.data.startDate);
         }
      }
   };
   // 3.7 Submit End
   const handleSubmitEndDate = async (dataDate) => {
      const dataForm = { dueDate: dataDate?.dueDate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('dueDate', issues.data.dueDate);
         }
      }
   };

   const renderChildrenIssue = issueChildren
      ?.map((issueChildren) => {
         return <RowIssue key={issueChildren._id} data={issueChildren} setIssues={setIssueChildren} children />;
      })
      .reverse();

   return (
      <div className={cx('container-issue')}>
         <div className={cx('section-left')}>
            <div className={cx('wrapper-left')}>
               <NavUrl
                  url={[
                     { name: 'Projects', link: '/project' },
                     {
                        name: detailIssue.projectID?.nameProject,
                        link: `/project/${detailIssue.projectID?.codeProject}/black-log`,
                     },
                     detailIssue.parentIssue !== null
                        ? {
                             name: detailIssueParent?.name,
                             link: `/projects/${detailIssueParent.projectID?.codeProject}/issues/${detailIssueParent?.name}`,
                          }
                        : null,
                     {
                        name: detailIssue?.name,
                        link: `/projects/${detailIssue.projectID?.codeProject}/issues/${detailIssue?.name}`,
                     },
                  ].filter((item) => item !== null)}
               />
               <div>
                  <div className={cx('issue-header')}>
                     <h1>{detailIssue?.summary}</h1>
                  </div>
                  {detailIssue?.parentIssue === null && (
                     <div className={cx('issue-header')}>
                        <Button
                           leftIcon={<TreeIcon />}
                           style={{ height: '32px', fontSize: '14px' }}
                           onClick={() => setIsToggleCreateIssue(!isToggleCreateIssue)}
                        >
                           Add a child issue
                        </Button>
                     </div>
                  )}
                  <div className={cx('issue-header')}>
                     {isToggleDesc ? (
                        <Modal isOpen={isToggleDesc} onClose={() => setIsToggleDesc(false)} relative>
                           <ControllerForm form={form} name="description" label="Description">
                              <TinyText
                                 setEditorValue={setValueDesc}
                                 onClose={() => setIsToggleDesc(false)}
                                 handleSubmit={() =>
                                    handleSubmitDesc(param?.id, detailIssue?._id, { description: valueDesc })
                                 }
                                 value={detailIssue?.description}
                              />
                           </ControllerForm>
                        </Modal>
                     ) : (
                        <ControllerForm form={form} label="Description" name="button-desc">
                           <Input
                              placeholder="Add a description..."
                              className={cx('custom-input')}
                              onFocus={() => setIsToggleDesc(true)}
                           />
                        </ControllerForm>
                     )}
                     {!isToggleDesc && detailIssue?.description && (
                        <div
                           style={{ marginTop: '16px', background: '#ebecf0', padding: '8px', borderRadius: '4px' }}
                           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailIssue?.description) }}
                        />
                     )}
                  </div>
                  {detailIssue?.parentIssue === null && (
                     <div className={cx('issue-children')}>
                        <div className={cx('issue-children-header')}>
                           <h2>Children issues</h2>
                           <Button
                              leftIcon={<AddIcon />}
                              noChildren
                              backgroundNone
                              className={cx('custom-btn')}
                              onClick={() => {
                                 setIsToggleCreateIssue(!isToggleCreateIssue);
                              }}
                           ></Button>
                        </div>
                        <div className={cx('issue-children-list')}>{renderChildrenIssue}</div>
                        {isToggleCreateIssue && (
                           <Modal isOpen={true} onClose={() => setIsToggleCreateIssue(false)} relative>
                              <CreateIssue setIssues={setIssueChildren} idParent={detailIssue?._id} />
                           </Modal>
                        )}
                     </div>
                  )}
               </div>
               <div className={cx('issue-children-header', 'issue-children')}>
                  <h2>Active</h2>
               </div>
               <div className={cx('issue-children-header')}>
                  <div className={cx('flex-start', 'show')}>
                     <span>Show: </span>
                     <div className={cx('comment')}>
                        <span> Comment</span>
                     </div>
                  </div>
                  <div className={cx('sort-comment')}>
                     <Button backgroundNone rightIcon={<DownIcon />} style={{ height: '24px' }}>
                        Newest first
                     </Button>
                  </div>
               </div>
               <div className={cx('flex-start', 'issue-children')}>
                  <div className={cx('img-comment')}>
                     <img
                        src="https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1"
                        alt=""
                     />
                  </div>
                  <div className={cx('form-comment')}>
                     <form>
                        <ControllerForm form={form} name="comment">
                           <Input placeholder="Add a comment..." search="search" className={cx('custom-input')} />
                        </ControllerForm>
                     </form>
                  </div>
               </div>
               <div className={cx('list-comment')}>
                  <div className={cx('item-comment')}>
                     <div className={cx('item-grid')}>
                        <div className={cx('img-comment')}>
                           <img
                              src="https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1"
                              alt=""
                           />
                        </div>
                        <div className={cx('content-comment')}>
                           <div className={cx('content-flex')}>
                              <div className={cx('content-flex')}>
                                 <h3>
                                    <span className={cx('control-comment')}>
                                       <div>Đạt Thành Nguyễn</div>
                                       <span className={cx('content-time')}>15 minutes ago</span>
                                    </span>
                                 </h3>
                                 <div className={cx('content')}>
                                    <span>Test</span>
                                 </div>
                              </div>
                              <div className={cx('control-comment')}>
                                 <span>Edit</span>
                                 <span>·</span>
                                 <span>Delete</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className={cx('section-center')}></div>
         <div className={cx('section-right')}>
            <div className={cx('wrapper-right')}>
               <div className={cx('control-header-right')}>
                  <Button noChildren backgroundNone leftIcon={<MenuIcon />}></Button>
               </div>
               <div className={cx('content-right')}>
                  <div className={cx('control-content-right')}>
                     <Button
                        onClick={() => setIsToggleStatus(!isToggleStatus)}
                        blue={(detailIssue?.status === 'INPROGRESS' || detailIssue?.status === 'REVIEW') && true}
                        success={detailIssue?.status === 'DONE' && true}
                        rightIcon={<DownIcon />}
                        style={{ height: '32px', fontSize: '14px' }}
                     >
                        {detailIssue?.status === 'TODO'
                           ? 'To Do'
                           : detailIssue?.status === 'INPROGRESS'
                           ? 'In Progress'
                           : detailIssue?.status === 'REVIEW'
                           ? 'In Review'
                           : detailIssue?.status === 'DONE'
                           ? 'Done'
                           : ''}
                     </Button>
                     {isToggleStatus && (
                        <Modal isOpen={isToggleStatus} relative onClose={() => setIsToggleStatus(false)}>
                           <ModalSelect
                              width="200px"
                              onClose={() => setIsToggleStatus(false)}
                              handleSubmit={(option) => handleChangeStatus(param?.id, detailIssue?._id, option)}
                              status
                              data={[
                                 detailIssue?.status !== 'TODO' ? { label: 'TO DO', key: 'TODO' } : null,
                                 detailIssue?.status !== 'INPROGRESS'
                                    ? { label: 'IN PROGRESS', key: 'INPROGRESS' }
                                    : null,
                                 detailIssue?.status !== 'REVIEW' ? { label: 'IN REVIEW', key: 'REVIEW' } : null,
                                 detailIssue?.status !== 'DONE' ? { label: 'DONE', key: 'DONE' } : null,
                              ].filter((item) => item !== null)}
                           />
                        </Modal>
                     )}
                  </div>
                  <div className={cx('detail-content-right')}>
                     <div className={cx('detail-content')}>
                        <header className={cx('detail-header')}>
                           <strong>Details</strong>
                        </header>
                        <div className={cx('main-content')}>
                           <div className={cx('main-assignee')}>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Assignee</label>
                                 <Input className={cx('custom-input')} />
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Reporter</label>
                                 <Input className={cx('custom-input')} />
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Sprint</label>
                                 <div className={cx('wrapper-input')}>
                                    <Input
                                       className={cx('custom-input')}
                                       onFocus={() => setIsToggleSprint(true)}
                                       onClick={() => setIsToggleSprint(true)}
                                       value={detailIssue.sprint?.name ? detailIssue.sprint?.name : 'None'}
                                    />
                                    <Modal isOpen={isToggleSprint} relative onClose={() => setIsToggleSprint(false)}>
                                       <ModalSelect
                                          width="100%"
                                          onClose={() => setIsToggleSprint(false)}
                                          handleSubmit={(option) =>
                                             handleChangeSprint(param?.id, detailIssue?._id, option)
                                          }
                                          status
                                          data={dataLabelSprint.reverse()}
                                       />
                                    </Modal>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Priority</label>
                                 <div className={cx('wrapper-input')}>
                                    <Input
                                       className={cx('custom-input')}
                                       onFocus={() => setIsTogglePrior(true)}
                                       onClick={() => setIsTogglePrior(true)}
                                       value={detailIssue.priority}
                                    />
                                    <Modal isOpen={isTogglePrior} relative onClose={() => setIsTogglePrior(false)}>
                                       <ModalSelect
                                          width="100%"
                                          widthImg="24px"
                                          onClose={() => setIsTogglePrior(false)}
                                          handleSubmit={(option) =>
                                             handleChangeStatus(param?.id, detailIssue?._id, option)
                                          }
                                          status
                                          data={[
                                             detailIssue?.priority !== 'Highest'
                                                ? {
                                                     label: 'Highest',
                                                     img: 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg',
                                                  }
                                                : null,
                                             detailIssue?.priority !== 'High'
                                                ? {
                                                     label: 'High',
                                                     img: 'https://tcx19.atlassian.net/images/icons/priorities/high.svg',
                                                  }
                                                : null,
                                             detailIssue?.priority !== 'Low'
                                                ? {
                                                     label: 'Low',
                                                     img: 'https://tcx19.atlassian.net/images/icons/priorities/low.svg',
                                                  }
                                                : null,
                                             detailIssue?.priority !== 'Lowest'
                                                ? {
                                                     label: 'Lowest',
                                                     img: 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg',
                                                  }
                                                : null,
                                             detailIssue?.priority !== 'Medium'
                                                ? {
                                                     label: 'Medium',
                                                     img: 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg',
                                                  }
                                                : null,
                                          ].filter((item) => item !== null)}
                                       />
                                    </Modal>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Story point estimate</label>
                                 <div className={cx('wrapper-input')}>
                                    <form onSubmit={form.handleSubmit(handleSubmitPoint)}>
                                       <ControllerForm form={form} name={'storyPointEstimate'}>
                                          <Input
                                             className={cx('custom-input')}
                                             type="number"
                                             defaultValue={form.watch('storyPointEstimate')}
                                          />
                                       </ControllerForm>
                                    </form>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Start date</label>
                                 <div className={cx('wrapper-input')}>
                                    <form onSubmit={form.handleSubmit(handleSubmitStartDate)}>
                                       <ControllerForm form={form} name={'startDate'}>
                                          <Input
                                             className={cx('custom-input')}
                                             type="datetime-local"
                                             onBlur={handleBlur}
                                          />
                                       </ControllerForm>
                                    </form>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Due date</label>
                                 <div className={cx('wrapper-input')}>
                                    <form onSubmit={handleSubmitEndDate}>
                                       <ControllerForm form={form} name={'dueDate'}>
                                          <Input
                                             className={cx('custom-input')}
                                             type="datetime-local"
                                             onBlur={handleBlurEnd}
                                          />
                                       </ControllerForm>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailIssue;
