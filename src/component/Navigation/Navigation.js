import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Navigation.module.scss';
import Modal from '../Modal/Modal';
import Button from '../Buttton/Button';
import { DownIcon } from '../icon/icon';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import ControllerForm from '../ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import ModalSelect from '../ModalSelect/ModalSelect';
import WorkService from '~/services/work/workServices';
import { ProjectContext } from '~/contexts/project/projectContext';
const cx = classNames.bind(style);
function Navigation({ isOpen, onClose }) {
   const { detailProject } = useContext(ProjectContext);

   const projectService = new WorkService();
   const [toggle, setToggle] = useState(false);
   const [role, setRole] = useState({
      label: 'Member',
   });
   const form = useForm({
      mode: 'all',
      defaultValues: {
         email: '',
         role: role.label,
         key: role.key,
      },
   });
   useEffect(() => {
      form.setValue('role', role.label);
   }, [role]);
   const handleAddPeople = async (dataForm) => {
      const data = { ...dataForm, role: role.key };
      const addPeople = await projectService.addMember(detailProject?.codeProject, data);
      if (addPeople.status === 200) onClose();
   };

   return (
      <div className={cx('wrapper')}>
         <Modal width="400px" className={cx('modal')} maxWidth="400px" isOpen={isOpen} onClose={onClose}>
            <div className={cx('main')}>
               <div className={cx('nav')}>
                  <header className={cx('header')}>
                     <div className={cx('title')}>
                        <h1>Add People to WorkFlow</h1>
                     </div>
                  </header>
                  <form action="" className={cx('form')} onSubmit={form.handleSubmit(handleAddPeople)}>
                     <div className={cx('mb-16')}>
                        <ControllerForm form={form} name="email" label="Email" required id="email">
                           <Input
                              type="text"
                              id="email"
                              search="search"
                              style={{ width: '100%', height: '40px' }}
                              placeholder="e.g., maria@company.com"
                           />
                        </ControllerForm>
                     </div>
                     <div className={cx('mb-16')} onClick={() => setToggle(!toggle)}>
                        <ControllerForm form={form} name="role" label="Role" required id="role">
                           <Input
                              type="select"
                              rightIcon={<DownIcon />}
                              id="role"
                              search="search"
                              style={{ width: '100%', height: '48px' }}
                              placeholder="Administrator"
                           />
                        </ControllerForm>
                        {toggle && (
                           <ModalSelect
                              width="100%"
                              setValue={setRole}
                              value={role}
                              data={[
                                 {
                                    label: 'Manager',
                                    key: 'manager',
                                 },
                                 {
                                    label: 'Member',
                                    key: 'member',
                                 },
                              ]}
                           />
                        )}
                     </div>
                     <div className={cx('mb-16', 'text-desc')}>
                        You're inviting people as admins. Admins can set up projects, add more people, install apps, and
                        upgrade plans. Alternatively, you can{' '}
                        <Link className={cx('text-link')}>invite people as users.</Link>
                     </div>
                     <div className={cx('mb-16', 'text-desc')}>
                        This site is protected by reCAPTCHA and the Google <Link>Privacy Policy</Link> and{' '}
                        <Link className={cx('text-link')}>Terms of Service</Link> apply.
                     </div>
                     <div className={cx('btn-group')}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button blue type="submit">
                           Update
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Navigation;
