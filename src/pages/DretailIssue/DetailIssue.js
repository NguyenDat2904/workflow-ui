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
const cx = classNames.bind(style);
function DetailIssue() {
   const form = useForm();
   const param = useParams();
   const issueService = new IssueService();
   // 1. State
   const [detailIssue, setDetailIssue] = useState({});
   const [detailIssueParent, setDetailIssueParent] = useState({});
   const [issueChildren, setIssueChildren] = useState([]);
   const [isToggleCreateIssue, setIsToggleCreateIssue] = useState(false);
   const [isToggleDesc, setIsToggleDesc] = useState(false);
   const [valueDesc, setValueDesc] = useState('');
   console.log(valueDesc);
   // 2. UseEffect
   useEffect(() => {
      getIssueDetail();
   }, [param]);
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
         } else {
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
                     {!isToggleDesc && (
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
                        <ControllerForm form={form} name="description">
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
