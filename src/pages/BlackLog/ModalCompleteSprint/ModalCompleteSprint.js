import React, { useState } from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import classNames from 'classnames/bind';
import style from './ModalCompleteSprint.module.scss';
import Button from '~/component/Buttton/Button';

import { DownIcon, LoadingIcon } from '~/component/icon/icon';
import Input from '~/component/Input/Input';
import Modal from '~/component/Modal/Modal';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import IssueService from '~/services/issue/issueService';
import SprintService from '~/services/sprint/SprintService';
const cx = classNames.bind(style);
function ModalCompleteSprint({ isOpen, isClose, issues, sprints, data, detailProject, getListIssue, setPrints }) {
   const issueService = new IssueService();
   const sprintService = new SprintService();
   const [isToggleSprint, setIsToggleSprint] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [valueSprint, setValueSprint] = useState({
      label: 'Enter sprint',
      id: '',
   });

   const issuesDone = issues?.filter((issue) => issue?.status === 'DONE');
   const issuesOpen = issues?.filter((issue) => issue?.status !== 'DONE');
   const listSprint = sprints?.filter((sprint) => sprint?._id !== data?._id);
   const dataSelectSprint = listSprint?.map((item) => {
      return {
         label: item?.name,
         id: item?._id,
      };
   });

   const handleSubmitComplete = async (event) => {
      event.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      const dataForm = { sprint: valueSprint.id };
      if (issuesOpen?.length > 0) {
         const changeIssue = issuesOpen?.map(async (issue) => {
            const changeSprint = await issueService.updateIssue(issue?.infoProjects?.codeProject, issue?._id, dataForm);
         });
      }
      if (issuesDone?.length > 0) {
         const deleteIssueDone = issuesDone?.map(async (issue) => {
            const deleteIssue = await issueService.deleteIssue(detailProject?.codeProject, issue?._id);
         });
      }
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
            maxWidth="600px"
            isOpen={isOpen}
            isClose={isClose}
            header="Complete : WF12 Sprint 1"
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
               <div style={{ marginTop: 'var(--ds-space-100, 8px)', position: 'relative' }}>
                  <Input
                     type="text"
                     rightIcon={<DownIcon />}
                     id="move-issues"
                     search="search"
                     style={{ width: '100%' }}
                     onClick={() => setIsToggleSprint(true)}
                     value={valueSprint.label}
                  />
                  <Modal relative isOpen={isToggleSprint} onClose={() => setIsToggleSprint(false)}>
                     <ModalSelect
                        width="100%"
                        onClose={() => setIsToggleSprint(false)}
                        data={dataSelectSprint}
                        setValue={setValueSprint}
                     />
                  </Modal>
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
