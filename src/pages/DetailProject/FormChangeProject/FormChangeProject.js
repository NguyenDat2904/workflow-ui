import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './FormChangeProject.module.scss';
import Button from '~/component/Buttton/Button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LoadingIcon } from '~/component/icon/icon';
import { useForm } from 'react-hook-form';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import schema from './FormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '~/contexts/user/userContext';
import WorkService from '~/services/work/workServices';
import { ProjectContext } from '~/contexts/project/projectContext';
import FormIcon from '../FormIcon/FormIcon';

const cx = classNames.bind(style);
function FormChangeProject({ id, roleUser }) {
   const { parseuser, loadingDetailsProject, setLoadingDetailsProject } = useContext(UserContext);
   const { setDetailProject, detailProject } = useContext(ProjectContext);
   const [toggle, setToggle] = useState(false);
   const workService = new WorkService();
   const [isLoading, setIsLoading] = useState(false);
   // useForm
   const form = useForm({
      mode: 'all',
      defaultValues: {
         name: detailProject?.nameProject,
         key: detailProject?.codeProject,
      },
      resolver: yupResolver(schema),
   });
   // useState
   const [loadingIconSummit, setLoadingIconSummit] = useState(false);
   // GET detail Project
   const getDetailProject = async () => {
      setLoadingDetailsProject(true);
      const project = await workService.projectDetail(id);
      if (project.status === 200) {
         setDetailProject(project.data);
         form.setValue('name', detailProject?.nameProject);
         form.setValue('key', detailProject?.codeProject);
      }
      setLoadingDetailsProject(false);
   };
   useEffect(() => {
      getDetailProject();
   }, []);
   // Set value
   useEffect(() => {
      form.setValue('name', detailProject?.nameProject);
      form.setValue('key', detailProject?.codeProject);
   }, [detailProject]);

   const changeDetailProject = async (data) => {
      if (roleUser?.role === 'member') return;
      if (isLoading) return;
      setIsLoading(true);
      const dataForm = { name: data.name, userID: parseuser?._id };
      setLoadingIconSummit(true);
      const changeProject = await workService.changeProject(detailProject?.codeProject, dataForm);
      if (changeProject.status === 200) getDetailProject();
      setLoadingIconSummit(false);
      setIsLoading(false);
   };

   return (
      <div>
         {toggle && (
            <FormIcon
               isOpen={toggle}
               isClose={() => setToggle(false)}
               id={detailProject?.codeProject}
               getDetailProject={getDetailProject}
            />
         )}
         <form action="" className={cx('form')} onSubmit={form.handleSubmit(changeDetailProject)}>
            <div>
               <div className={cx('change-icon')}>
                  {loadingDetailsProject ? (
                     <Skeleton width="128px" height="128px" />
                  ) : (
                     <img src={detailProject?.imgProject} alt="icon" />
                  )}
               </div>
               <div
                  className={cx('btn-change')}
                  onClick={(event) => {
                     event.preventDefault();
                  }}
               >
                  <Button
                     disable={roleUser?.role === 'member'}
                     style={{
                        cursor: roleUser?.role !== 'member' ? 'pointer' : 'not-allowed',
                        height: '32px',
                        background:
                           roleUser?.role === 'member' && 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                        fontSize: '14px',
                     }}
                     onClick={() => {
                        if (roleUser?.role !== 'member') setToggle(true);
                     }}
                  >
                     Change icon
                  </Button>
               </div>
            </div>
            <div className={cx('change-input')}>
               {loadingDetailsProject ? (
                  <Skeleton width="344px" height="60px" />
               ) : (
                  <ControllerForm form={form} name="name" label="Name" required id="name" className="search">
                     <div>
                        <div className={cx('form')}>
                           <div className={cx('form-input')}>
                              <input
                                 style={{ height: '40px', cursor: roleUser?.role === 'member' && 'not-allowed' }}
                                 className="input"
                                 id="name"
                                 defaultValue={form.watch('name')}
                                 disabled={roleUser?.role === 'member'}
                              />
                           </div>
                        </div>
                     </div>
                  </ControllerForm>
               )}
            </div>
            <div className={cx('change-input')}>
               {loadingDetailsProject ? (
                  <Skeleton width="344px" height="60px" />
               ) : (
                  <ControllerForm form={form} name="key" label="Key" required id="key" className="search">
                     <div>
                        <div className={cx('form')}>
                           <div className={cx('form-input')}>
                              <input
                                 style={{ height: '40px', cursor: 'not-allowed' }}
                                 className="input"
                                 defaultValue={form.watch('key')}
                                 id="key"
                                 disabled
                              />
                           </div>
                        </div>
                     </div>
                  </ControllerForm>
               )}
            </div>
            <div className={cx('change-input')}>
               {loadingDetailsProject ? (
                  <Skeleton width="38px" height="32px" />
               ) : (
                  <Button
                     type="submit"
                     disable={roleUser?.role === 'member'}
                     blue
                     style={{
                        minWidth: '58px',
                        cursor: roleUser?.role !== 'member' ? 'pointer' : 'not-allowed',
                        height: '32px',
                        background:
                           roleUser?.role === 'member' && 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                     }}
                  >
                     {loadingIconSummit ? <LoadingIcon /> : 'Save'}
                  </Button>
               )}
            </div>
         </form>
      </div>
   );
}

export default FormChangeProject;
