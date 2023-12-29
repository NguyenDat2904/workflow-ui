import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './FormChangeProject.module.scss';
import Input from '~/component/Input/Input';
import Button from '~/component/Buttton/Button';
import { get, patch } from '~/ultil/hpptRequest';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LoadingIcon } from '~/component/icon/icon';
import { useForm } from 'react-hook-form';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import schema from './FormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '~/contexts/user/userContext';
import WorkService from '~/services/work/workServices';
import { AuthContext } from '~/contexts/auth/authContext';

const cx = classNames.bind(style);
function FormChangeProject({ id }) {
   const { parseuser, detailProject, setDetailProject, loadingDetailsProject, setLoadingDetailsProject } =
      useContext(UserContext);
   const { accessToken } = useContext(AuthContext);

   const workService = new WorkService();
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
   useEffect(() => {
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
      if (accessToken) getDetailProject();
   }, []);
   // Set value
   useEffect(() => {
      form.setValue('name', detailProject?.nameProject);
      form.setValue('key', detailProject?.codeProject);
   }, [detailProject]);

   const changeDetailProject = async (data) => {
      if (accessToken) {
         setLoadingIconSummit(true);
         await workService.changeProject(detailProject?._id, data.name, data.key, parseuser?.id);
         setLoadingIconSummit(false);
      }
   };

   return (
      <div>
         <form action="" className={cx('form')} onSubmit={form.handleSubmit(changeDetailProject)}>
            <div>
               <div className={cx('change-icon')}>
                  {loadingDetailsProject ? (
                     <Skeleton width="128px" height="128px" />
                  ) : (
                     <img src={detailProject?.imgProject} alt="icon" />
                  )}
               </div>
               <div className={cx('btn-change')}>
                  <Button>Change icon</Button>
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
                                 style={{ height: '40px' }}
                                 className="input"
                                 id="name"
                                 defaultValue={form.watch('name')}
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
                                 style={{ height: '40px' }}
                                 className="input"
                                 defaultValue={form.watch('key')}
                                 id="key"
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
                  <Button type="submit" blue style={{ minWidth: '58px' }}>
                     {loadingIconSummit ? <LoadingIcon /> : 'Save'}
                  </Button>
               )}
            </div>
         </form>
      </div>
   );
}

export default FormChangeProject;
