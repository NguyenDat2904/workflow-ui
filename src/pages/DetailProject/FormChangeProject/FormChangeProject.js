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

const cx = classNames.bind(style);
function FormChangeProject({ id }) {
   const { accessToken, parseuser, detailProject, setDetailProject, loadingDetailsProject, setLoadingDetailsProject } =
      useContext(UserContext);
   // useForm
   const form = useForm({
      mode: 'all',
      defaultValues: {
         name: '',
         key: '',
         nameAdmin: '',
         imgAdmin: '',
      },
      resolver: yupResolver(schema),
   });
   // useState

   const [loadingIconSummit, setLoadingIconSummit] = useState(false);
   // GET detail Project
   useEffect(() => {
      const getDetailProject = async () => {
         setLoadingDetailsProject(true);
         const detailProject = await get(`/work/project-detail/${id}`, {
            headers: {
               authorization: `${accessToken}`,
               refresh_token: `${parseuser?.refreshToken}`,
            },
         });
         if (detailProject.data.accessToken) {
            const getDetailAgain = await get(`/work/project-detail/${id}`, {
               headers: {
                  authorization: `${detailProject.data.accessToken}`,
                  refresh_token: `${parseuser?.refreshToken}`,
               },
            });
            localStorage.setItem('accessToken', detailProject.data.accessToken);
            setDetailProject(getDetailAgain.data);
         } else {
            setDetailProject(detailProject.data);
         }
         setLoadingDetailsProject(false);
      };
      getDetailProject();
   }, []);

   // Set value
   useEffect(() => {
      form.setValue('name', detailProject?.nameProject);
      form.setValue('key', detailProject?.codeProject);
      form.setValue('nameAdmin', detailProject.adminID?.name);
      form.setValue('imgAdmin', detailProject.adminID?.img);
   }, [detailProject]);

   const changeDetailProject = async (data) => {
      setLoadingIconSummit(true);
      const changeProject = await patch(
         `/work/edit-project/${id}`,
         {
            nameProject: data.name,
            codeProject: data.key,
            _idUser: parseuser?._id,
         },
         {
            headers: {
               authorization: `${accessToken}`,
               refresh_token: `${parseuser?.refreshToken}`,
            },
         },
      );
      if (changeProject.data?.accessToken) {
         const changeProjectAgain = await patch(
            `/work/edit-project/:_id`,
            {
               nameProject: data.name,
               codeProject: data.key,
            },
            {
               headers: {
                  authorization: `${changeProject.data.accessToken}`,
                  refresh_token: `${parseuser?.refreshToken}`,
               },
            },
         );
         localStorage.setItem('accessToken', changeProject.data.accessToken);
      }
      setLoadingIconSummit(false);
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
                                 defaultValue={form.getValues('name')}
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
                                 defaultValue={form.getValues('key')}
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
                  <Skeleton width="344px" height="60px" />
               ) : (
                  <Input
                     height="40px"
                     search="search"
                     img
                     label="Project lead"
                     disableForm
                     defaultValue={form.getValues('nameAdmin')}
                     leftIcon={
                        <img
                           src={
                              form.getValues('imgAdmin') ||
                              'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                           }
                           alt=""
                           className={cx('img-leader')}
                        />
                     }
                  />
               )}
            </div>
            <div className={cx('change-input')}>
               {loadingDetailsProject ? (
                  <Skeleton width="38px" height="32px" />
               ) : (
                  <Button
                     type="submit"
                     disable={loadingIconSummit ? true : false}
                     blue={loadingIconSummit ? false : true}
                     leftIcon={loadingIconSummit && <LoadingIcon />}
                  >
                     {!loadingIconSummit && 'Save'}
                  </Button>
               )}
            </div>
         </form>
      </div>
   );
}

export default FormChangeProject;
