import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalAcceptChangeParent.module.scss';
import { LoadingIcon, WarningIcon } from '../icon/icon';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import Button from '../Buttton/Button';
import Modal from '../Modal/Modal';
import ModalSelect from '../ModalSelect/ModalSelect';
import IssueService from '~/services/issue/issueService';
import { ProjectContext } from '~/contexts/project/projectContext';

const cx = classNames.bind(style);
const issueService = new IssueService();

function ModalAcceptChangeParent({ isOpen, isClose, blue, headerTitle }) {
   const { detailProject } = useContext(ProjectContext);
   const [isLoading, setIsLoading] = useState(false);
   const [issues, setIssues] = useState([]);

   const getIssueParent = async () => {
      const listIssue = await issueService.getIssue(detailProject?.codeProject, { parentIssueID: 'null' });
      setIssues(listIssue.data.dataListIssues);
   };
   useEffect(() => {
      const getissue = async () => {
         setIsLoading(true);
         await getIssueParent();
         setIsLoading(false);
      };
      getissue();
   }, []);

   return (
      <ModalIcon width="600px" isOpen={isOpen} isClose={isClose} header={headerTitle}>
         <div className={cx('text-desc')}>
            <p>
               Select a parent issue for this issue. Issues can only belong to one parent issue at a time.{' '}
               <strong>WF-118</strong> is currently assigned to <strong>WF-118</strong>.
            </p>
         </div>
         {
            <Modal isOpen={isLoading} onClose={isClose} relative>
               <ModalSelect width="550px" onClose={''} handleSubmit={''} status data={['', '']} />
            </Modal>
         }
         <div className={cx('btn-group')}>
            <Button style={{ minWidth: '71px' }} blue={blue ? true : false} type="submit">
               {isLoading ? <LoadingIcon /> : <span style={{paddingLeft:'4px'}}>Done</span>}
            </Button>
            <Button onClick={isClose}>Cancel</Button>
         </div>
      </ModalIcon>
   );
}

export default ModalAcceptChangeParent;
