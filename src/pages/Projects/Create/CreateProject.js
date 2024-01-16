import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CreateProject.module.scss';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import { LoadingIcon, LogoIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import WorkService from '~/services/work/workServices';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './CreateProject.Validation';

const cx = classNames.bind(style);

export default function CreateProject() {
   const projectService = new WorkService();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const form = useForm({
      mode: 'all',
      defaultValues: {
         nameProject: '',
         codeProject: '',
      },
      resolver: yupResolver(schema),
   });

   const handleCreateProject = async (data) => {
      if (loading) {
         return;
      }
      setLoading(true);
      const createProject = await projectService.createProject(data);
      if (createProject.status === 200) {
         navigate(`/project/${createProject?.data.data.codeProject}/black-log`);
      }
      if (createProject.data.message === 'already exists checkNameProject') {
         form.setError('nameProject', {
            type: 'manual',
            message: 'Project name already exists. Please enter another name',
         });
      }
      if (createProject.data.message === 'already exists checkCodeProject') {
         form.setError('codeProject', {
            type: 'manual',
            message: 'Key name already exists. Please enter another key',
         });
      }
      setLoading(false);
   };
   return (
      <div>
         <form onSubmit={form.handleSubmit(handleCreateProject)} className={cx('create-project-container')}>
            <div className={cx('project-container')}>
               <div className={cx('project-wrapper')}>
                  <div className={cx('project-wrapper-left')}>
                     <p className={cx('title')}>Create a New Project</p>
                     <p className={cx('subtitle')}>
                        Explore what's possible when you collaborate with your team. Edit project details anytime in
                        project settings.
                     </p>
                     <div style={{ marginTop: '16px' }}>
                        <ControllerForm form={form} name="nameProject" required label="Name" id="project-name">
                           <Input
                              id="project-name"
                              placeholder="Try a team name, project goal,..."
                              search="search"
                              className={cx('custom-input')}
                           />
                        </ControllerForm>
                     </div>
                     <div style={{ marginTop: '16px' }}>
                        <ControllerForm form={form} name="codeProject" required label="Key" id="project-key">
                           <Input id="project-key" search="search" />
                        </ControllerForm>
                     </div>
                  </div>
                  <div className={cx('project-wrapper-right')}>
                     <div className={cx('project-wrapper-right-header')}>
                        <h2>Template</h2>
                     </div>
                     <div className={cx('project-wrapper-right-card')}>
                        <div className={cx('wrapper-right-img')}>
                           <div className={cx('right-img')}></div>
                        </div>
                        <div className={cx('wrapper-right-content')}>
                           <h4 className={cx('wrapper-right-header')}>Scrum</h4>
                           <span className={cx('wrapper-right-logo')}>
                              <LogoIcon />
                           </span>
                           <p className={cx('right-content-desc')}>
                              Sprint toward your project goals with a board, backlog, and timeline.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <hr className={cx('hr')} />
               <div className={cx('btn-group')}>
                  <Button to="/project">Cancel</Button>
                  <Button blue type="submit" className={cx('custom')}>
                     {!loading ? <span>Create</span> : <LoadingIcon />}
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
}
