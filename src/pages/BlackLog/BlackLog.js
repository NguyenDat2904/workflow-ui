import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './BlackLog.module.scss';
import HeaderProject from './HeaderProject/HeaderProject';

import Sprint from './Sprint/Sprint';
import SprintService from '~/services/sprint/SprintService';
import { ProjectContext } from '~/contexts/project/projectContext';
import WorkService from '~/services/work/workServices';
import { UserContext } from '~/contexts/user/userContext';

const cx = classNames.bind(style);
function BlackLog() {
   const { detailProject, members, setMembers } = useContext(ProjectContext);
   const { dataUserProfile } = useContext(UserContext);
   const sprintService = new SprintService();
   const projectService = new WorkService();
   const [sprints, setPrints] = useState([]);
   const [checkedTypes, setCheckedTypes] = useState([]);
   const [selectedMembers, setSelectedMembers] = useState([]);
   const [loading, setIsLoading] = useState(true);

   useEffect(() => {
      pendingData();
   }, [detailProject]);

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
   const pendingData = async () => {
      setIsLoading(true);
      await getMembers();
      await getListSprints();
   };

   const roleUsers = members?.filter((user) => {
      return user._id === dataUserProfile._id;
   });
   const roleUser = roleUsers[0];

   const renderSprint = sprints
      ?.map((sprint, index) => {
         return (
            <Sprint
               key={sprint._id}
               data={sprint}
               start={index === sprints.length - 1 && true}
               setPrints={setPrints}
               members={members}
               checkedTypes={checkedTypes}
               selectedMembers={selectedMembers}
               sprints={sprints}
               getListSprints={getListSprints}
               roleUser={roleUser}
               setIsLoading={setIsLoading}
               loading={loading}
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
            <HeaderProject
               headerName={'Backlog'}
               checkedTypes={checkedTypes}
               setSelectedMembers={setSelectedMembers}
               selectedMembers={selectedMembers}
               setCheckedTypes={setCheckedTypes}
               members={members}
            />
         </div>
         <div className={cx('main-section')}>
            <div className={cx('main')}>
               <div className={cx('sprint-dropdown')}>
                  {renderSprint}
                  <Sprint
                     title="Backlog"
                     handleCreateSprint={handleCreateSprint}
                     setPrints={setPrints}
                     members={members}
                     sprints={sprints}
                     checkedTypes={checkedTypes}
                     selectedMembers={selectedMembers}
                     getListSprints={getListSprints}
                     roleUser={roleUser}
                     setIsLoading={setIsLoading}
                     loading={loading}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default BlackLog;
