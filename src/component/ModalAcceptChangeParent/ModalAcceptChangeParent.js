import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalAcceptChangeParent.module.scss';
import { DownIcon, LoadingIcon, WarningIcon } from '../icon/icon';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import Button from '../Buttton/Button';
import Modal from '../Modal/Modal';
import ModalSelect from '../ModalSelect/ModalSelect';
import IssueService from '~/services/issue/issueService';
import { ProjectContext } from '~/contexts/project/projectContext';
import Input from '../Input/Input';

const cx = classNames.bind(style);
const issueService = new IssueService();

function ModalAcceptChangeParent({
   isOpen,
   isClose,
   blue,
   headerTitle,
   title,
   getListIssue,
   getListIssueSprint,
   getListIssueChildren,
   data,
   setIsChangeParent,
}) {
   const { detailProject } = useContext(ProjectContext);
   const [isLoading, setIsLoading] = useState(false);
   const [isToggle, setIsToggle] = useState(false);

   const [issues, setIssues] = useState([]);

   const getIssueParent = async () => {
      const listIssue = await issueService.getIssue(detailProject?.codeProject, { parentIssueID: 'null' });
      setIssues(listIssue.data.dataListIssues);
   };

   const handleSubmitchangeParent = async (key, id, option) => {
      setIsLoading(true);
      const dataForm = { parentIssue: option.idIssue };
      const updateIssue = await issueService.changeParent(key, id, dataForm);
      if (updateIssue.status === 200) {
         getListIssueSprint();
         getListIssueChildren();
         if (title === 'Blacklog') getListIssue();
      }
      setIsLoading(false);
      setIsChangeParent(false);
   };
   useEffect(() => {
      const getissue = async () => {
         setIsLoading(true);
         await getIssueParent();
         setIsLoading(false);
      };
      getissue();
   }, []);
   const listIssue = issues?.map((issue) => {
      return {
         idIssue: issue?._id,
         img: issue?.img
            ? issue?.img
            : 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
         label: issue?.name,
      };
   });
   const newListIssues = listIssue.filter((issue) => issue?.idIssue !== data?._id);

   return (
      <ModalIcon
         width="600px"
         height="auto"
         isOpen={isOpen}
         isClose={isClose}
         header={headerTitle}
         style={{ position: 'relative' }}
      >
         <div className={cx('text-desc')}>
            <p>Select a parent issue for this issue. Issues can only belong to one parent issue at a time.</p>
         </div>

         <div style={{ marginTop: '10px' }} onClick={() => setIsToggle(!isToggle)}>
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
            />
            <Modal maxHeight={'260px'} width={'auto'} relative isOpen={isToggle} onClose={() => setIsToggle(false)}>
               <ModalSelect
                  style={{ top: 'auto', position: 'fixed', transition: 'all 0.2s else' }}
                  width="553px"
                  widthImg="20px"
                  heightRow="35px"
                  onClose={() => setIsToggle(false)}
                  handleSubmit={(option) => handleSubmitchangeParent(detailProject?.codeProject, data?._id, option)}
                  percent50
                  data={newListIssues}
               />
            </Modal>
         </div>
         <div className={cx('btn-group')}>
            <Button
               style={{ minWidth: '71px', cursor: isLoading ? 'no-drop' : '' }}
               blue={blue ? true : false}
               type={isLoading ? 'button' : 'submit'}
            >
               {isLoading ? <LoadingIcon /> : <span style={{ paddingLeft: '4px' }}>Done</span>}
            </Button>
            <Button onClick={isClose}>Cancel</Button>
         </div>
      </ModalIcon>
   );
}

export default ModalAcceptChangeParent;
