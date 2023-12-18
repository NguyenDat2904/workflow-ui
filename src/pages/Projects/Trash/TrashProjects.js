import React, { useEffect } from 'react';
import './TrashProjects.scss';
import { Table } from '~/component/tables/Tables';

export default function TrashProjects() {
   const handleRestoreProject = (project) => {
      console.log(project);
   };

   const handleDeleteProject = (project) => {
      console.log(project);
   };

   return (
      <div className="trash-projects">
         <h3>Removed Projects</h3>
         <Table
            actions={[
               { label: 'Restore', method: handleRestoreProject },
               { label: 'Permanently Delete', method: handleDeleteProject },
            ]}
            colWidthRatio={[40, 20, 40]}
            data={[
               { name: 'Project 1', key: 'P1', leader: 'John' },
               { name: 'Project 2', key: 'P2', leader: 'Jane' },
               { name: 'Project 3', key: 'P3', leader: 'Bob' },
            ]}
         />
      </div>
   );
}
