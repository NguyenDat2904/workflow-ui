import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './BlackLog.module.scss';
import HeaderProject from './HeaderProject/HeaderProject';

import Sprint from './Sprint/Sprint';
import SprintService from '~/services/sprint/SprintService';
import { ProjectContext } from '~/contexts/project/projectContext';
import WorkService from '~/services/work/workServices';

const cx = classNames.bind(style);
function BlackLog() {
   const { detailProject } = useContext(ProjectContext);
   const sprintService = new SprintService();
   const projectService = new WorkService();
   const [sprints, setPrints] = useState([]);
   const [members, setMembers] = useState([]);

   // GetSprint
   const getListSprints = async () => {
      if (detailProject.codeProject) {
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200) setPrints(listPrints.data.sprint);
      }
   };

   // Get Member
   const getMembers = async () => {
      if (detailProject.codeProject) {
         const listMembers = await projectService.getMember({ codeProject: detailProject?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   };
   useEffect(() => {
      getMembers();
      getListSprints();
   }, [detailProject]);
   const renderSprint = sprints
      ?.map((sprint, index) => {
         return (
            <Sprint
               key={sprint._id}
               data={sprint}
               start={index === sprints.length - 1 && true}
               setPrints={setPrints}
               members={members}
            />
         );
      })
      .reverse();
   // Create Sprint
   const handleCreateSprint = async () => {
      const createSprint = await sprintService.createSprint(detailProject?.codeProject);
      if (createSprint.status === 200) {
         const listPrints = await sprintService.getSprint(detailProject?.codeProject);
         if (listPrints.status === 200) setPrints(listPrints.data.sprint);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div style={{ padding: '0 40px' }}>
            <HeaderProject headerName={'Backlog'} />
         </div>
         <div className={cx('main')}>
            <div className={cx('sprint-dropdown')}>
               {renderSprint}
               <Sprint
                  data={{ name: 'Blacklog' }}
                  handleCreateSprint={handleCreateSprint}
                  setPrints={setPrints}
                  members={members}
               />
            </div>
         </div>
      </div>
   );
}

export default BlackLog;
