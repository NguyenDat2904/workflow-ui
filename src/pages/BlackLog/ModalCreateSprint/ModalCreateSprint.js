import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalCreateSprint.module.scss';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import Input from '~/component/Input/Input';
import { useForm } from 'react-hook-form';
import Button from '~/component/Buttton/Button';
import SprintService from '~/services/sprint/SprintService';
import { LoadingIcon } from '~/component/icon/icon';

const cx = classNames.bind(style);
function ModalCreateSprint({ data, isOpen, isClose, keyProject, setPrints, btn_acpt, checkedTypes }) {
   const sprintService = new SprintService();
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      mode: 'all',
      defaultValues: {
         name: data?.name || '',
         startDate: data?.startDate || '',
         endDate: data?.startEnd || '',
         sprintGoal: data?.sprintGoal || '',
      },
   });
   const handleSubmit = async (dataForm) => {
      if (isLoading) return;
      setIsLoading(true);
      const dataFormSprint = { ...dataForm, status: btn_acpt === 'Start' ? 'RUNNING' : 'PENDING' };
      const updateSprint = await sprintService.updateSprint(keyProject, data._id, dataFormSprint);
      if (updateSprint.status === 200) {
         const listPrints = await sprintService.getSprint(keyProject, {});
         if (listPrints.status === 200) setPrints(listPrints.data.sprint);
      }
      isClose();
      setIsLoading(false);
   };

   return (
      <ModalIcon
         width="600px"
         className={cx('modal')}
         maxWidth="600px"
         isOpen={isOpen}
         isClose={isClose}
         header="Edit sprint: WF12 Sprint 1"
      >
         <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <div style={{ marginTop: 'var(--ds-space-100, 8px)' }}>
               <ControllerForm form={form} name="name" label="Sprint name" required id="sprint_name">
                  <Input id="sprint_name" search="search" style={{ width: '250px' }} />
               </ControllerForm>
            </div>
            <div style={{ marginTop: 'var(--ds-space-100, 8px)' }}>
               <ControllerForm form={form} name="startDate" label="Start date" required id="sprint_start">
                  <Input type="date" id="sprint_start" search="search" style={{ width: '250px' }} />
               </ControllerForm>
            </div>
            <div style={{ marginTop: 'var(--ds-space-100, 8px)' }}>
               <ControllerForm form={form} name="endDate" label="End date" required id="sprint_end">
                  <Input type="date" id="sprint_end" search="search" style={{ width: '250px' }} />
               </ControllerForm>
            </div>
            <div style={{ marginTop: 'var(--ds-space-100, 8px)' }}>
               <ControllerForm form={form} name="sprintGoal" label="Sprint goal" id="sprint_goal">
                  <textarea
                     type="tex"
                     rows="5"
                     id="sprint_goal"
                     search="search"
                     style={{ width: '100%' }}
                     className={cx('text-area')}
                  />
               </ControllerForm>
            </div>
            <div className={cx('btn-group')}>
               <Button onClick={isClose}>Cancel</Button>
               <Button blue type="submit" style={{ minWidth: '56px' }}>
                  {isLoading ? <LoadingIcon /> : <>{btn_acpt}</>}
               </Button>
            </div>
         </form>
      </ModalIcon>
   );
}

export default ModalCreateSprint;
