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
import { useNavigate, useParams } from 'react-router-dom';
import IssueService from '~/services/issue/issueService';
import CreateIssue from '../BlackLog/Sprint/CreateIssue/CreateIssue';
import Modal from '~/component/Modal/Modal';
import DOMPurify from 'dompurify';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import SprintService from '~/services/sprint/SprintService';
import WorkService from '~/services/work/workServices';
import moment from 'moment';
import ModalAccept from '~/component/ModalAccept/ModalAccept';
import CommentService from '../../services/comment/CommentService';
import Dropdown from '~/component/dropdown/Dropdown';
const cx = classNames.bind(style);
function DetailIssue() {
   const param = useParams();

   const navigate = useNavigate();

   const issueService = new IssueService();
   const sprintService = new SprintService();
   const projectService = new WorkService();
   const commentService = new CommentService();

   // 1. State
   const [detailIssue, setDetailIssue] = useState({});
   const [detailIssueParent, setDetailIssueParent] = useState({});
   const [issueChildren, setIssueChildren] = useState([]);
   const [sprints, setSprints] = useState([]);
   const [members, setMembers] = useState([]);
   const [comments, setComments] = useState([]);

   const [isEditComments, setIsEditComments] = useState(null);
   const [isAcceptDeleteComment, setIsAcceptDeleteComment] = useState(null);
   const [isToggleCreateIssue, setIsToggleCreateIssue] = useState(false);
   const [isToggleAcceptDeleteIssue, setIsToggleAcceptDeleteIssue] = useState(false);
   const [isToggleDesc, setIsToggleDesc] = useState(false);
   const [isComment, setIsComment] = useState(false);
   const [isToggleStatus, setIsToggleStatus] = useState(false);
   const [isToggleSprint, setIsToggleSprint] = useState(false);
   const [isTogglePrior, setIsTogglePrior] = useState(false);
   const [isToggleAssignee, setIsToggleAssignee] = useState(false);
   const [isToggleReporter, setIsToggleReporter] = useState(false);
   const [valueDesc, setValueDesc] = useState('');
   const [valueComment, setValueComment] = useState('');
   const [isPendingSubmit, setIsPendingSubmit] = useState(false);

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
      getMembers();
      getListComment();
   }, [param]);
   useEffect(() => {
      form.setValue('storyPointEstimate', detailIssue?.storyPointEstimate);
      form.setValue('startDate', detailIssue?.startDate?.substring(0, 10));
      form.setValue('dueDate', detailIssue?.dueDate?.substring(0, 10));
   }, [detailIssue]);
   // 3.0 get list comment
   const getListComment = async () => {
      const commentsList = await commentService.getComment(param?.id_issue);
      if (commentsList.status === 200) {
         setComments(commentsList.data);
      }
   };

   // 3.0.1 Add Comment
   const postComment = async (option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const comment = await commentService.addComment(option);
      if (comment.status === 200) {
         getListComment();
      }
      setIsPendingSubmit(false);
   };

   // 3.0.1 Edit Comment
   const handleSubmitEditComment = async (id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const editComment = await commentService.editComment(id, option);
      if (editComment.status === 200) {
         getListComment();
      }
      setIsPendingSubmit(false);
   };

   const handleDeleteComment = async (id) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const deleteComment = await commentService.deleteComment(id);
      if (deleteComment.status === 200) getListComment();
      setIsPendingSubmit(false);
   };

   // 3.1 get issue detail
   const getIssueDetail = async () => {
      const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
      if (issues.status === 200) {
         setDetailIssue(issues.data);
         if (issues.data.parentIssue === null) {
            const issueChildren = await issueService.getIssue(param?.id, {
               parentIssueID: issues.data._id,
            });
            if (issueChildren.status === 200)
               setIssueChildren(issueChildren.data.dataListIssues.filter((item) => item.parentIssue !== null));
         } else if (issues.data.parentIssue) {
            const issueParent = await issueService.getIssueDetail(param?.id, {
               idParen: issues.data.parentIssue,
            });
            if (issueParent.status === 200) setDetailIssueParent(issueParent.data);
         }
      }
   };
   // 3.2 Submit desc
   const handleSubmitDesc = async (key, id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const updateIssue = await issueService.updateIssue(key, id, option);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
      setIsPendingSubmit(false);
   };
   // 3.3 ChangeStatus
   const handleChangeStatus = async (key, id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { status: option.key };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
      setIsPendingSubmit(false);
   };
   // 3.3 ChangeStatus
   const handleChangePriority = async (key, id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { priority: option.label };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
      setIsPendingSubmit(false);
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
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { sprint: option.key };
      const updateIssue = await issueService.updateIssue(keyProject, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) setDetailIssue(issues.data);
      }
      setIsPendingSubmit(false);
   };

   // 3.6 Submit Point
   const handleSubmitPoint = async (dataPoint) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { storyPointEstimate: +dataPoint?.storyPointEstimate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('storyPointEstimate', issues.data.storyPointEstimate);
         }
      }
      setIsPendingSubmit(false);
   };
   // 3.7 Get Member
   const getMembers = async () => {
      const listMembers = await projectService.getMember(param?.id, {});
      if (listMembers.status === 200) setMembers(listMembers.data);
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
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { startDate: dataDate?.startDate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('startDate', issues.data.startDate);
         }
      }
      setIsPendingSubmit(false);
   };
   // 3.7 Submit End
   const handleSubmitEndDate = async (dataDate) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { dueDate: dataDate?.dueDate };
      const updateIssue = await issueService.updateIssue(param?.id, detailIssue?._id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            form.setValue('dueDate', issues.data.dueDate);
         }
      }
      setIsPendingSubmit(false);
   };

   // 3.9 Submit Agr
   const handleChangeAssignee = async (key, id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { assignee: option.idUser };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
            // form.setValue('dueDate', issues.data.dueDate);
         }
      }
      setIsPendingSubmit(false);
   };
   // 3.10 Submit Reporter
   const handleChangeReporter = async (key, id, option) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const dataForm = { reporter: option.idUser };
      const updateIssue = await issueService.updateIssue(key, id, dataForm);
      if (updateIssue.status === 200) {
         const issues = await issueService.getIssueDetail(param?.id, { search: param?.id_issue });
         if (issues.status === 200) {
            setDetailIssue(issues.data);
         }
      }
      setIsPendingSubmit(false);
   };
   // 3.11 Submit Delete Submit
   const handleDeleteIssue = async (codeProject, id_issue) => {
      if (isPendingSubmit) {
         return;
      }
      setIsPendingSubmit(true);
      const deleteIssue = await issueService.deleteIssue(codeProject, id_issue);
      if (deleteIssue.status === 200) navigate(`/project/${codeProject}/black-log`);
      setIsPendingSubmit(false);
   };

   const renderChildrenIssue = issueChildren
      ?.map((issueChildren) => {
         return (
            <RowIssue
               key={issueChildren._id}
               data={issueChildren}
               idParent={detailIssue._id}
               setIssues={setIssueChildren}
               children
               members={members}
               setIssueChildren={setIssueChildren}
            />
         );
      })
      .reverse();

   const imgIssue =
      detailIssue?.issueType === 'USER_STORY'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
         : detailIssue?.issueType === 'BUG'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
         : detailIssue?.issueType === 'TASK'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
         : detailIssue?.issueType === 'SUB_TASK'
         ? 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium'
         : '';
   const imgIssueParent =
      detailIssueParent?.issueType === 'USER_STORY'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
         : detailIssueParent?.issueType === 'BUG'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
         : detailIssueParent?.issueType === 'TASK'
         ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
         : detailIssueParent?.issueType === 'SUB_TASK'
         ? 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium'
         : '';
   const renderComment = comments?.map((comment) => {
      const currentTime = moment();
      const commentMoment = moment(comment?.commentTime);
      const duration = moment.duration(currentTime.diff(commentMoment));
      let formattedTime;
      if (duration.asHours() < 1) {
         // Thời gian dưới 1 giờ
         formattedTime = duration.minutes() + ' minutes ago';
      } else if (duration.asHours() < 24) {
         // Thời gian từ 1 giờ đến 24 giờ
         formattedTime = duration.hours() + ' hours ago';
      } else if (duration.asDays() < 7) {
         // Thời gian từ 1 ngày đến 6 ngày
         formattedTime = duration.days() + ' days ago';
      } else {
         // Thời gian trên 7 ngày
         formattedTime = commentMoment.format('MMM D, YYYY');
      }
      return (
         <div className={cx('item-comment')}>
            <div className={cx('item-grid')}>
               <div className={cx('img-comment')}>
                  <img
                     src={
                        comment.authorID?.img
                           ? comment.authorID?.img
                           : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                     }
                     alt=""
                  />
               </div>
               <div className={cx('content-comment')}>
                  <div className={cx('content-flex')}>
                     <div className={cx('content-flex')}>
                        <h3>
                           <span className={cx('control-comment')}>
                              <div>{comment.authorID?.name}</div>
                              <span className={cx('content-time')}>{formattedTime}</span>
                           </span>
                        </h3>
                        <div className={cx('content')}>
                           <span>
                              {isEditComments === comment._id ? (
                                 <TinyText
                                    setEditorValue={setValueComment}
                                    onClose={() => setIsEditComments(false)}
                                    handleSubmit={() =>
                                       handleSubmitEditComment(comment?._id, {
                                          content: valueComment,
                                       })
                                    }
                                    value={comment?.content}
                                 />
                              ) : (
                                 <div
                                    style={{ fontSize: '14px' }}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.content) }}
                                 />
                              )}
                           </span>
                        </div>
                     </div>
                     <div className={cx('control-comment')}>
                        <span onClick={() => setIsEditComments(comment._id)}>Edit</span>
                        <span>·</span>
                        <span onClick={() => setIsAcceptDeleteComment(comment._id)}>Delete</span>
                        {isAcceptDeleteComment === comment._id && (
                           <ModalAccept
                              headerTitle="Delete this comment?"
                              title="Once you delete, it's gone for good."
                              isOpen={isAcceptDeleteComment}
                              isClose={() => setIsAcceptDeleteComment(false)}
                              handleAccept={() => {
                                 handleDeleteComment(comment._id);
                                 setIsAcceptDeleteComment(false);
                              }}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });

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
                        img: detailIssue.projectID?.imgProject,
                     },
                     detailIssue.parentIssue !== null
                        ? {
                             name: detailIssueParent?.name,
                             link: `/projects/${detailIssueParent.projectID?.codeProject}/issues/${detailIssueParent?.name}`,
                             img: imgIssueParent,
                          }
                        : null,
                     {
                        name: detailIssue?.name,
                        link: `/projects/${detailIssue.projectID?.codeProject}/issues/${detailIssue?.name}`,
                        img: imgIssue,
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
                              <CreateIssue setIssues={setIssueChildren} idParent={detailIssue?._id} children />
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
                     {!isComment ? (
                        <Input
                           placeholder="Add a comment..."
                           search="search"
                           className={cx('custom-input')}
                           onFocus={() => setIsComment(true)}
                        />
                     ) : (
                        <TinyText
                           setEditorValue={setValueComment}
                           onClose={() => setIsComment(false)}
                           handleSubmit={() => postComment({ content: valueComment, issueID: detailIssue?._id })}
                        />
                     )}
                  </div>
               </div>
               <div className={cx('list-comment')}>{renderComment}</div>
            </div>
         </div>
         <div className={cx('section-center')}></div>
         <div className={cx('section-right')}>
            <div className={cx('wrapper-right')}>
               <div className={cx('control-header-right')}>
                  <Dropdown
                     className={cx('custom-dropdown')}
                     actions={[{ label: 'Delete issue', method: () => setIsToggleAcceptDeleteIssue(true) }]}
                  >
                     <Button noChildren backgroundNone leftIcon={<MenuIcon />} style={{ height: '32px' }}></Button>
                  </Dropdown>
               </div>
               {isToggleAcceptDeleteIssue && (
                  <ModalAccept
                     headerTitle={`Delete ${detailIssue?.name}?`}
                     isOpen={isToggleAcceptDeleteIssue}
                     isClose={() => setIsToggleAcceptDeleteIssue(false)}
                     title="You're about to permanently delete this issue, its comments and attachments, and all of its data."
                     handleAccept={() => handleDeleteIssue(param?.id, detailIssue?._id)}
                  />
               )}
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
                                 <div className={cx('wrapper-input')}>
                                    <Input
                                       heightImg="24px"
                                       leftIcon={
                                          <img
                                             src={
                                                detailIssue.assignee?.img
                                                   ? detailIssue.assignee?.img
                                                   : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                                             }
                                             alt=""
                                             style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                                          />
                                       }
                                       value={detailIssue.assignee?.name ? detailIssue.assignee?.name : 'Unassigned'}
                                       className={cx('custom-input')}
                                       onFocus={() => setIsToggleAssignee(true)}
                                       onClick={() => setIsToggleAssignee(true)}
                                    />
                                    <Modal
                                       relative
                                       isOpen={isToggleAssignee}
                                       onClose={() => setIsToggleAssignee(false)}
                                    >
                                       <ModalSelect
                                          width="100%"
                                          heightRow="48px"
                                          widthImg="32px"
                                          onClose={() => setIsToggleAssignee(false)}
                                          data={listMember}
                                          handleSubmit={(option) =>
                                             handleChangeAssignee(param?.id, detailIssue?._id, option)
                                          }
                                       />
                                    </Modal>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Reporter</label>
                                 <div className={cx('wrapper-input')}>
                                    <Input
                                       heightImg="24px"
                                       leftIcon={
                                          <img
                                             src={
                                                detailIssue.reporter?.img
                                                   ? detailIssue.reporter?.img
                                                   : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                                             }
                                             alt=""
                                             style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                                          />
                                       }
                                       value={detailIssue.reporter?.name ? detailIssue.reporter?.name : 'Unassigned'}
                                       className={cx('custom-input')}
                                       onFocus={() => setIsToggleReporter(true)}
                                       onClick={() => setIsToggleReporter(true)}
                                    />
                                    <Modal
                                       relative
                                       isOpen={isToggleReporter}
                                       onClose={() => setIsToggleReporter(false)}
                                    >
                                       <ModalSelect
                                          width="100%"
                                          heightRow="48px"
                                          widthImg="32px"
                                          onClose={() => setIsToggleReporter(false)}
                                          data={listMember}
                                          handleSubmit={(option) =>
                                             handleChangeReporter(param?.id, detailIssue?._id, option)
                                          }
                                       />
                                    </Modal>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Sprint</label>
                                 <div className={cx('wrapper-input')}>
                                    <Input
                                       className={cx('custom-input')}
                                       style={{ color: 'var(--ds-link, #0052CC)' }}
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
                                       leftIcon={
                                          <img
                                             src={
                                                detailIssue?.priority === 'Highest'
                                                   ? 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg'
                                                   : detailIssue?.priority === 'High'
                                                   ? 'https://tcx19.atlassian.net/images/icons/priorities/high.svg'
                                                   : detailIssue?.priority === 'Low'
                                                   ? 'https://tcx19.atlassian.net/images/icons/priorities/low.svg'
                                                   : detailIssue?.priority === 'Lowest'
                                                   ? 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg'
                                                   : 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg'
                                             }
                                             alt=""
                                             style={{ width: '16px', height: '16px' }}
                                          />
                                       }
                                    />
                                    <Modal isOpen={isTogglePrior} relative onClose={() => setIsTogglePrior(false)}>
                                       <ModalSelect
                                          width="100%"
                                          widthImg="24px"
                                          onClose={() => setIsTogglePrior(false)}
                                          handleSubmit={(option) =>
                                             handleChangePriority(param?.id, detailIssue?._id, option)
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
                                          <Input className={cx('custom-input')} type="date" onBlur={handleBlur} />
                                       </ControllerForm>
                                    </form>
                                 </div>
                              </div>
                              <div className={cx('assignee-select')}>
                                 <label htmlFor="">Due date</label>
                                 <div className={cx('wrapper-input')}>
                                    <form onSubmit={handleSubmitEndDate}>
                                       <ControllerForm form={form} name={'dueDate'}>
                                          <Input className={cx('custom-input')} type="date" onBlur={handleBlurEnd} />
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
