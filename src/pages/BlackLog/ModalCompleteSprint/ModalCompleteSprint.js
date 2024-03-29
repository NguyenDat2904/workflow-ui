import React, { useEffect, useState } from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import classNames from 'classnames/bind';
import style from './ModalCompleteSprint.module.scss';
import Button from '~/component/Buttton/Button';
import { DownIcon, LoadingIcon } from '~/component/icon/icon';
import SprintService from '~/services/sprint/SprintService';
import Modal from '~/component/Modal/Modal';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import Input from '~/component/Input/Input';
import IssueService from '~/services/issue/issueService';
const cx = classNames.bind(style);
function ModalCompleteSprint({ isOpen, isClose, issues, data, detailProject, getListIssue, setPrints }) {
   const sprintService = new SprintService();
   const issueService = new IssueService();
   const [isLoading, setIsLoading] = useState(false);
   const [listSprints, setListSprint] = useState([]);
   const [isToggleModalSprint, setIsToggleModalSprint] = useState(false);
   const [valueSprintComplete, setValueSprintComplete] = useState({});

   const issuesDone = issues?.filter((issue) => issue?.status === 'DONE');
   const issuesOpen = issues?.filter((issue) => issue?.status !== 'DONE');

   useEffect(() => {
      getListSprints();
   }, []);

   console.log(valueSprintComplete);

   const handleSubmitComplete = async (event) => {
      event.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      if (issuesDone?.length > 0) {
         issues.forEach(async (issue) => issueService.deleteIssue(detailProject?.codeProject, issue?._id));
      }
      if (issuesOpen?.length > 0) {
         issues.forEach(async (issue) =>
            issueService.updateIssue(detailProject?.codeProject, issue?._id, { sprint: valueSprintComplete?.id }),
         );
      }
      const deleteSprint = await sprintService.deleteSprint(detailProject?.codeProject, data?._id);
      if (deleteSprint.status === 200) {
         isClose();
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200) {
            if (setPrints) setPrints(listPrints.data.sprint);
            if (getListIssue) getListIssue();
         }
      }
      setIsLoading(false);
   };
   // GetSprint
   const getListSprints = async () => {
      if (detailProject.codeProject) {
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200)
            setListSprint(listPrints.data.sprint?.filter((sprint) => sprint?._id !== data?._id));
      }
   };
   const listSprint = listSprints?.map((sprint) => {
      return {
         label: sprint?.name,
         id: sprint?._id,
      };
   });
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
               <div style={{ marginTop: '10px' }} onClick={() => setIsToggleModalSprint(!isToggleModalSprint)}>
                  <Input
                     className={cx('transparentInput')}
                     placeholder="Choose parent issue"
                     type="text"
                     style={{
                        width: '100%',
                        height: '40px',
                        border: '2px solid var(--ds-border-input, #dfe1e6)',
                        margin: '10px 0',
                     }}
                     rightIcon={<DownIcon nameCss={cx('iconDownBotton')} />}
                     value={valueSprintComplete?.label}
                  />
                  <Modal
                     maxHeight={'260px'}
                     width={'auto'}
                     relative
                     isOpen={isToggleModalSprint}
                     onClose={() => setIsToggleModalSprint(false)}
                  >
                     <ModalSelect
                        style={{ top: 'auto', position: 'fixed', transition: 'all 0.2s else' }}
                        width="553px"
                        widthImg="20px"
                        heightRow="35px"
                        onClose={() => setIsToggleModalSprint(false)}
                        percent50
                        data={listSprint}
                        setValue={setValueSprintComplete}
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
