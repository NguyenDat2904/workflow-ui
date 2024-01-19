import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalSearch.module.scss';
import Modal from '~/component/Modal/Modal';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function ModalSearch({ isOpen, onClose, getIssueSearch }) {
   const renderSearch = getIssueSearch?.map((issue) => {
      return (
         <div key={issue._id}>
            <Link to={`/projects/${issue?.projectID?.codeProject}/issues/${issue?.name}`} onClick={onClose}>
               <div className={cx('list-search')}>
                  <div className={cx('item-search-img')}>
                     <img
                        src={
                           issue?.issueType === 'USER_STORY'
                              ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
                              : issue?.issueType === 'BUG'
                              ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
                              : issue?.issueType === 'TASK'
                              ? 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
                              : ''
                        }
                        alt=""
                     />
                  </div>
                  <div className={cx('item-search-name')}>
                     <span>
                        {issue?.name} {issue?.summary}
                     </span>
                  </div>
               </div>
            </Link>
         </div>
      );
   });
   return (
      <div className={cx('wrapper')}>
         <Modal isOpen={isOpen} relative onClose={onClose}>
            <div className={cx('main')}>
               <div className={cx('title')}>
                  <div className={cx('modal-title')}>Recently viewed</div>
               </div>
               {renderSearch}
            </div>
         </Modal>
      </div>
   );
}

export default ModalSearch;
