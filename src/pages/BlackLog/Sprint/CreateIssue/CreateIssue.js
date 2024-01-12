import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import Input from '~/component/Input/Input';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import { DownIcon } from '~/component/icon/icon';
import { ProjectContext } from '~/contexts/project/projectContext';
import IssueService from '~/services/issue/issueService';
import classNames from 'classnames/bind';

import style from '../../BlackLog.module.scss';

const cx = classNames.bind(style);

function CreateIssue({ setIssues, idPrint, idParent }) {
   const { detailProject } = useContext(ProjectContext);
   const issueService = new IssueService();

   const [isToggleIssue, setIsToggleIssue] = useState(false);
   const [valueTask, setValueTask] = useState({
      label: 'Story',
      key: 'USER_STORY',
      img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
   });

   const form = useForm({
      mode: 'all',
      defaultValues: {
         summary: '',
      },
   });
   // 3.2. Create issue
   const handleCreateIssue = async (dataForm) => {
      const dataIssue = {
         ...dataForm,
         issueType: valueTask.key,
         sprint: idPrint,
         parentIssue: idParent ? idParent : null,
      };
      const createIssue = await issueService.createIssue(detailProject?.codeProject, dataIssue);
      if (createIssue.status === 200) {
         const listIssue = await issueService.getIssue(detailProject?.codeProject, {
            sprintID: idPrint,
            parentIssueID: idParent,
         });
         if (listIssue.status === 200) setIssues(listIssue.data.dataListIssues);
      }
      form.reset();
   };

   return (
      <form action="" className={cx('form-issue')} onSubmit={form.handleSubmit(handleCreateIssue)}>
         <ControllerForm form={form} name="summary">
            <Input className={cx('custom-input')} autoFocus placeholder="What need to be done?" search="search" />
         </ControllerForm>
         <Button
            className={cx('custom-button')}
            rightIcon={<DownIcon />}
            style={{ cursor: 'pointer', height: '24px', padding: '0 4px' }}
            onClick={() => {
               setIsToggleIssue(!isToggleIssue);
            }}
            type="button"
         >
            <img
               src={
                  valueTask?.img ||
                  'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
               }
               alt=""
            />
         </Button>
         {isToggleIssue && (
            <ModalSelect
               width="160px"
               widthImg="16px"
               setValue={setValueTask}
               onClose={() => setIsToggleIssue(false)}
               data={[
                  valueTask?.label !== 'Story'
                     ? {
                          label: 'Story',
                          key: 'USER_STORY',
                          img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
                       }
                     : null,
                  valueTask?.label !== 'Bug'
                     ? {
                          label: 'Bug',
                          key: 'BUG',
                          img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
                       }
                     : null,
                  valueTask?.label !== 'Task'
                     ? {
                          label: 'Task',
                          key: 'TASK',
                          img: 'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
                       }
                     : null,
               ].filter((item) => item !== null)}
            />
         )}
      </form>
   );
}

export default CreateIssue;