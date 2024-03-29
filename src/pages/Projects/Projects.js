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
import WorkService from '~/services/work/workServices';
import LoadingBox from '~/component/LoadingBox/LoadingBox';

const cx = classNames.bind(style);

function Projects() {
   const { setLoadingGetProject } = useContext(UserContext);
   const projectService = new WorkService();
   const [search, setSearch] = useState('');
   const navigate = useNavigate();

   // 1. State
   const [projectsList, setProjectsList] = useState([]);
   const [page, setPage] = useState(null);
   const [loading, setLoading] = useState(true);
   // 2. useEffect
   useEffect(() => {
      pending();
   }, [page]);
   const pending = async () => {
      setLoading(true);
      await getProjects();
      setLoading(false);
   };

   useEffect(() => {
      getProjects();
   }, [search]);

   // 3. Func
   const getProjects = async () => {
      setLoadingGetProject(true);
      const projects = await projectService.getListProject({
         deleteProject: false,
         search: search,
         page: page,
      });
      if (projects.status === 200) {
         setProjectsList(projects.data.data);
         setPage(projects.data.page);
      }
      setLoadingGetProject(false);
   };
   // Move to Trash
   const handleMoveToTrash = async (id) => {
      const moveToTrash = await projectService.deleteProject(id);
      if (moveToTrash.status === 200) {
         getProjects();
      }
   };
   if (loading) {
      return <LoadingBox />;
   }

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
               <Input
                  placeholder="Search Projects"
                  rightIcon={<SearchIcon />}
                  search="search"
                  style={{ width: '100%' }}
                  onKeyDown={(event) => {
                     if (event.keyCode === 13) {
                        setSearch(event.target.value);
                     }
                  }}
               />
            </div>
         </div>
         {projectsList?.length === 0 && (
            <div className={cx('project-none')}>
               <img
                  src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/jira-laptop-done.35194f30.svg"
                  alt=""
               />
               <h4 className={cx('title-none')}>You don't have any software projects</h4>
               <p className={cx('txt-none')}></p>
            </div>
         )}
         {projectsList?.length > 0 && (
            <div className={cx('project-list')}>
               <ProjectList
                  projectsList={projectsList}
                  setProjectsList={setProjectsList}
                  handleMoveToTrash={handleMoveToTrash}
                  trash={false}
               />
            </div>
         )}
         {projectsList?.length > 0 && <Pagination page={page} />}
      </Main>
   );
}

export default Projects;
