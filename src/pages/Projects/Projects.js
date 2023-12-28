import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Projects.module.scss';
import Main from '~/component/Main/Main';
import Button from '~/component/Buttton/Button';
import Input from '~/component/Input/Input';
import { SearchIcon } from '~/component/icon/icon';
import ProjectList from './ProjectList/ProjectList';
import Pagination from '~/component/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(style);

function Projects() {
   const { loadingGetProject, parseuser } = useContext(UserContext);
   const projectService = new WorkService();
   const { accessToken } = useContext(AuthContext);

   const navigate = useNavigate();
   // 1. State
   const [projectsList, setProjectsList] = useState([]);
   const [page, setPage] = useState(null);
   // 2. useEffect
   useEffect(() => {
      const getProjects = async () => {
         if (accessToken) {
            const projects = await projectService.getListProject(parseuser._id);
            if (projects.status === 200) {
               setProjectsList(projects.data.workProject);
               setPage(projects.data.page);
            }
         }
      };
      getProjects();
   }, []);

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
            <ProjectList projectsList={projectsList} setProjectsList={setProjectsList} />
         </div>
         {!loadingGetProject && <Pagination page={page} />}
      </Main>
   );
}

export default Projects;
