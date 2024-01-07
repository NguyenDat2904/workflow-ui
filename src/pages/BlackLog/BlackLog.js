import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './BlackLog.module.scss';
import HeaderProject from './HeaderProject/HeaderProject';

import Sprint from './Sprint/Sprint';
import SprintService from '~/services/sprint/SprintService';
import { ProjectContext } from '~/contexts/project/projectContext';

const cx = classNames.bind(style);
function BlackLog() {
   const { detailProject } = useContext(ProjectContext);

   const sprintService = new SprintService();
   const [sprints, setPrints] = useState([]);

   const getListSprints = async () => {
      if (detailProject._id) {
         const listPrints = await sprintService.getSprint(detailProject?._id);
         if (listPrints.status === 200) setPrints(listPrints.data.sprint);
      }
   };
   useEffect(() => {
      getListSprints();
   }, [detailProject]);
   const renderSprint = sprints?.map((sprint, index) => {
      return <Sprint key={sprint._id} data={sprint} start={index === 0 && true} />;
   });

   return (
      <div className={cx('wrapper')}>
         <HeaderProject />
         <div className={cx('main')}>
            <div className={cx('sprint-dropdown')}>
               {renderSprint}
               <Sprint data={{ name: 'Blacklog' }} />
            </div>
         </div>
      </div>
   );
}

export default BlackLog;
