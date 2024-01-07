import React from 'react';
import classNames from 'classnames/bind';
import style from './RowIssue.module.scss';
import { DownIcon, TreeIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';

const cx = classNames.bind(style);
function RowIssue() {
   return (
      <div>
         <div className={cx('wrapper')}>
            <div className={cx('icon-issue')}>
               <img
                  src="https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium"
                  alt=""
               />
            </div>
            <div className={cx('name-issue')}>WF-59</div>
            <div className={cx('name-work')}>Dựng base code</div>
            <div className={cx('control-issue')}>
               <div className={cx('children-issue')}>
                  <TreeIcon />
               </div>
               <div style={{ minWidth: '100px', padding: '0px 12px' }}>
                  <div className={cx('epic-issue')}>
                     <span className={cx('epic-text')}>TC-X19</span>
                  </div>
               </div>
               <div style={{ gridTemplateColumns: '100px' }} className={cx('status-issue')}>
                  <Button
                     rightIcon={<DownIcon />}
                     backgroundNone
                     className={cx('custom-btn')}
                     style={{ height: '24px' }}
                  >
                     IN PROGRESS
                  </Button>
               </div>
            </div>
            <div className={cx('user-assignee')}>
               <span className={cx('img-assignee')}>
                  <img
                     src="https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1"
                     alt=""
                  />
               </span>
            </div>
         </div>
      </div>
   );
}

export default RowIssue;
