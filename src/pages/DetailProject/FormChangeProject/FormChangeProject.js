import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './FormChangeProject.module.scss';
import Input from '~/component/Input/Input';
import Button from '~/component/Buttton/Button';
import { get, patch } from '~/ultil/hpptRequest';
import { AppContext } from '~/hook/context/context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LoadingIcon } from '~/component/icon/icon';

const cx = classNames.bind(style);
function FormChangeProject({ id }) {
   const { accessToken, parseuser, detailProject, setDetailProject, loadingDetailsProject, setLoadingDetailsProject } =
      useContext(AppContext);
   const [values, setValue] = useState({
      name: '',
      key: '',
      project_lead: {
         name: '',
         img: '',
      },
   });
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
      setValue((prev) => ({
         ...prev,
         name: detailProject?.nameProject,
         key: detailProject?.codeProject,
         project_lead: {
            name: detailProject.adminID?.name,
            img: detailProject.adminID?.img,
         },
      }));
   }, [detailProject]);
   const handleChange = (e) => {
      const { name, value } = e.target;
      setValue((prevValues) => ({
         ...prevValues,
         [name]: value,
      }));
   };

   const changeDetailProject = async (event) => {
      event.preventDefault();
      setLoadingIconSummit(true);
      console.log(loadingIconSummit);

      const changeProject = await patch(
         `/work/edit-project/${id}`,
         {
            nameProject: values.name,
            codeProject: values.key,
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
               nameProject: values.name,
               codeProject: values.key,
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
         <form action="" className={cx('form')} onSubmit={changeDetailProject}>
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
                  <Input
                     height="40px"
                     search="search"
                     label="Name*"
                     name="name"
                     value={values.name}
                     onChange={handleChange}
                     disableForm
                  />
               )}
            </div>
            <div className={cx('change-input')}>
               {loadingDetailsProject ? (
                  <Skeleton width="344px" height="60px" />
               ) : (
                  <Input
                     height="40px"
                     search="search"
                     label="Key*"
                     name="key"
                     value={values.key}
                     onChange={handleChange}
                     disableForm
                  />
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
                     value={values.project_lead.name}
                     leftIcon={
                        <img
                           src={
                              values.project_lead.img ||
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
