import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '~/component/tables/Tables';
import WorkService from '~/services/work/workServices';
import Main from '~/component/Main/Main';
import classNames from 'classnames/bind';
import style from '~/pages/Projects/Projects.module.scss';
import Input from '~/component/Input/Input';
import { SearchIcon } from '~/component/icon/icon';
import ProjectList from '../ProjectList/ProjectList';
import Pagination from '~/component/Pagination/Pagination';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(style);

export default function TrashProjects() {
   const { setLoadingGetProject } = useContext(UserContext);

   const workService = new WorkService();
   const [trashProject, setTrashProject] = useState([]);
   const [search, setSearch] = useState('');
   const [page] = useState(1);
   const [loading, setLoading] = useState(true);
   const [isLoadingRestore, setIsLoadingRestore] = useState(false);
   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

   const navigate = useNavigate();

   const getProjects = async () => {
      setLoadingGetProject(true);
      setLoading(true);
      const response = await workService.getListProject({
         page,
         deleteProject: true,
         search: search,
      });

      switch (response.status) {
         case 200:
            const workProject = response.data.data;
            if (workProject) {
               setTrashProject(workProject);
            } else {
               setTrashProject([]);
            }
            break;
         case 404:
            navigate('/login');
            break;
         default:
            break;
      }
      setLoadingGetProject(false);
      setLoading(false);
   };
   useEffect(() => {
      getProjects();
   }, [page, search]);

   const handleRestoreProject = async (codeProject) => {
      if (isLoadingRestore) {
         return;
      }
      setIsLoadingRestore(true);
      const response = await workService.restoreProject(codeProject);
      switch (response.status) {
         case 200:
            getProjects();
            break;
         default:
            break;
      }
      setIsLoadingRestore(false);
   };

   const handleDeleteProject = async (codeProject) => {
      if (isLoadingDelete) {
         return;
      }
      setIsLoadingDelete(true);
      const response = await workService.deleteDirectProject(codeProject);
      switch (response.status) {
         case 200:
            console.log('deleted');
            getProjects();
            break;
         default:
            break;
      }
      setIsLoadingDelete(false);
   };

   return (
      <Main>
         <div className={cx('home-title')}>
            <div className={cx('flex-start')}>
               <div className={cx('home-title-header')}>
                  <h1>Trash</h1>
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
         <div className={cx('project-list')}>
            <ProjectList
               projectsList={trashProject}
               setProjectsList={setTrashProject}
               handleDeletePer={handleDeleteProject}
               handleRestore={handleRestoreProject}
               trash
            />
            {trashProject?.length === 0 && !loading && (
               <div className={cx('project-trash-none')}>
                  <div className={cx('trash-none')}>
                     <img
                        src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/generic-no-results.fb302821.svg"
                        alt=""
                     />
                     <h4>We couldn’t find any projects that match your search.</h4>
                  </div>
               </div>
            )}
         </div>
         {trashProject?.length !== 0 && <Pagination page={page} />}
      </Main>
   );
}
