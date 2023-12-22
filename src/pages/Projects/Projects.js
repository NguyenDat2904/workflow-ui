import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Projects.module.scss';
import Main from '~/component/Main/Main';
import Button from '~/component/Buttton/Button';
import Input from '~/component/Input/Input';
import { SearchIcon } from '~/component/icon/icon';
import ProjectList from './ProjectList/ProjectList';
import Pagination from '~/component/Pagination/Pagination';
import { post } from '~/ultil/hpptRequest';
import { AppContext } from '~/hook/context/context';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

function Projects() {
   const { pageProject } = useContext(AppContext);
   const navigate = useNavigate();
   return (
      <Main>
         <div className={cx('home-title')}>
            <div className={cx('flex-start')}>
               <div className={cx('home-title-header')}>
                  <h1>Projects</h1>
               </div>
               <div className={cx('create-icon')}>
                  <Button
                     blue
                     onClick={() => {
                        navigate('/project/create');
                     }}
                  >
                     Create project
                  </Button>
               </div>
            </div>
         </div>
         <div className={cx('input-filter')}>
            <div className={cx('input-wrapper')}>
               <Input placeholder="Search Projects" rightIcon={<SearchIcon />} search="search" />
            </div>
         </div>
         <div className={cx('project-list')}>
            <ProjectList />
         </div>
         <Pagination page={pageProject} />
      </Main>
   );
}

export default Projects;
