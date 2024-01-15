import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrashProjects.scss';
import { Table } from '~/component/tables/Tables';
import WorkService from '~/services/work/workServices';

const workService = new WorkService();

export default function TrashProjects() {
   const [trashProject, setTrashProject] = useState([]);
   const [renderedTrashProject, setRenderedTrashProject] = useState([]);
   const [page] = useState(1);
   const user = JSON.parse(localStorage.getItem('user'));
   const navigate = useNavigate();

   const getProjects = async () => {
      const response = await workService.getListProject({
         page,
         deleteProject: true,
      });

      switch (response.status) {
         case 200:
            const workProject = response.data.Project;
            if (workProject) {
               setTrashProject(workProject);
               const newProjects = [];
               for (let i = 0; i < workProject.length; i++) {
                  newProjects.push({
                     name: (
                        <div className="trash-project-name">
                           <img src={workProject[i].imgProject} alt="" />
                           <span>{workProject[i].nameProject}</span>
                        </div>
                     ),
                     key: workProject[i].codeProject,
                  });
               }
               setRenderedTrashProject(newProjects);
            } else {
               setTrashProject([]);
               setRenderedTrashProject([]);
            }
            break;
         case 404:
            navigate('/login');
            break;
         default:
            break;
      }
   };

   useEffect(() => {
      getProjects();
   }, []);

   const handleRestoreProject = async (codeProject) => {
      const response = await workService.restoreProject(codeProject);
      switch (response.status) {
         case 200:
            getProjects();
            break;
         case 404:
            navigate('/login');
            break;
         default:
            break;
      }
   };

   const handleDeleteProject = async (codeProject) => {
      const response = await workService.deleteDirectProject(codeProject);
      switch (response.status) {
         case 200:
            console.log('deleted');
            getProjects();
            break;
         case 404:
            // navigate('/login');
            break;
         default:
            break;
      }
   };

   return (
      <div className="trash-projects">
         <h3>Removed Projects</h3>
         <Table
            actions={[
               { label: 'Restore', method: handleRestoreProject },
               { label: 'Permanently Delete', method: handleDeleteProject },
            ]}
            colWidthRatio={[40, 60]}
            colType={['string', 'string']}
            data={renderedTrashProject}
            idList={trashProject.map((project) => project?._id)}
            labels={['Name', 'Key']}
         />
      </div>
   );
}
