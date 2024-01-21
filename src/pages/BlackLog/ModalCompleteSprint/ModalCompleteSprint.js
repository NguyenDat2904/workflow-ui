import React, { useState } from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import classNames from 'classnames/bind';
import style from './ModalCompleteSprint.module.scss';
import Button from '~/component/Buttton/Button';

import { LoadingIcon } from '~/component/icon/icon';
import SprintService from '~/services/sprint/SprintService';
const cx = classNames.bind(style);
function ModalCompleteSprint({ isOpen, isClose, issues, data, detailProject, getListIssue, setPrints }) {
   const sprintService = new SprintService();
   const [isLoading, setIsLoading] = useState(false);

   const issuesDone = issues?.filter((issue) => issue?.status === 'DONE');
   const issuesOpen = issues?.filter((issue) => issue?.status !== 'DONE');

   const handleSubmitComplete = async (event) => {
      event.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      const deleteSprint = await sprintService.deleteSprint(detailProject?.codeProject, data?._id);
      if (deleteSprint.status === 200) {
         isClose();
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200) {
            setPrints(listPrints.data.sprint);
            getListIssue();
         }
      }
      setIsLoading(false);
   };
   return (
      <div>
         <ModalIcon
            width="600px"
            className={cx('modal')}
            isOpen={isOpen}
            isClose={isClose}
            header={`Complete sprint ${detailProject?.nameProject}`}
            imgBanner
         >
            <form onSubmit={handleSubmitComplete}>
               <div className={cx('equal-issue')}>
                  <p>This sprint contains:</p>
                  <ul className={cx('list-issue')}>
                     <li className={cx('item-issue')}>
                        <span>{issuesDone?.length || '0'}</span> completed issue
                     </li>
                     <li className={cx('item-issue')}>
                        <span>{issuesOpen?.length || '0'} </span> open issues
                     </li>
                  </ul>
               </div>
               <div className={cx('btn-group')}>
                  <Button onClick={isClose}>Cancel</Button>
                  <Button blue type="submit" style={{ minWidth: '141px' }}>
                     {isLoading ? <LoadingIcon /> : 'Complete sprint'}
                  </Button>
               </div>
            </form>
         </ModalIcon>
      </div>
   );
}

export default ModalCompleteSprint;
