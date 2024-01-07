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
   const { parseuser, setLoadingGetProject } = useContext(UserContext);
   const projectService = new WorkService();
   const { accessToken } = useContext(AuthContext);

   const navigate = useNavigate();
   // 1. State
   const [projectsList, setProjectsList] = useState([]);
   const [page, setPage] = useState(null);
   const [loading, setLoading] = useState(false);
   // 2. useEffect
   const getProjects = async () => {
      setLoadingGetProject(true);
      setLoading(false);
      const projects = await projectService.getListProject({ deleteProject: false });
      if (projects.status === 200) {
         setProjectsList(projects.data.workProject);
         setPage(projects.data.page);
      }
      setLoading(true);
      setLoadingGetProject(false);
   };
   useEffect(() => {
      getProjects();
   }, []);

   // 3. Func
   // Move to Trash
   const handleMoveToTrash = async (id) => {
      if (accessToken) {
         const moveToTrash = await projectService.deleteProject(id, parseuser?._id);
         if (moveToTrash === 200) {
            const projects = await projectService.getListProject(parseuser?._id);
            setProjectsList(projects);
            setPage(projects.data.page);
         }
      }
   };

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
         {projectsList?.length === 0 && loading && (
            <div className={cx('project-none')}>
               <img
                  src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/jira-laptop-done.35194f30.svg"
                  alt=""
               />
               <h4 className={cx('title-none')}>You don't have any software projects</h4>
               <p className={cx('txt-none')}></p>
            </div>
         )}
         {projectsList?.length !== 0 && (
            <div className={cx('project-list')}>
               <ProjectList
                  projectsList={projectsList}
                  setProjectsList={setProjectsList}
                  handleMoveToTrash={handleMoveToTrash}
               />
            </div>
         )}
         {projectsList?.length !== 0 && <Pagination page={page} />}
      </Main>
   );
}

export default Projects;
