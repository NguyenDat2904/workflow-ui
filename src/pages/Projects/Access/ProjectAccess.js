import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { Table } from '~/component/tables/Tables';
import style from './ProjectAccess.module.scss';
import NavUrl from '~/component/NavUrl/NavUrl';
import { ProjectContext } from '~/contexts/project/projectContext';
import Button from '~/component/Buttton/Button';
import WorkService from '~/services/work/workServices';
import Navigation from '~/component/Navigation/Navigation';
import { UserContext } from '~/contexts/user/userContext';

const cx = classNames.bind(style);
export default function ProjectAccess() {
   const { detailProject } = useContext(ProjectContext);
   const { dataUserProfile } = useContext(UserContext);
   const [members, setMembers] = useState([]);
   const [isToggle, setIsToggle] = useState(false);

   const projectService = new WorkService();

   useEffect(() => {
      getMembers();
   }, [detailProject, dataUserProfile]);

   // Get Member
   const getMembers = async () => {
      if (detailProject.codeProject) {
         const listMembers = await projectService.getMember({ codeProject: detailProject?.codeProject });
         if (listMembers.status === 200) setMembers(listMembers.data);
      }
   };

   const roleUsers = members?.filter((user) => {
      return user._id === dataUserProfile._id;
   });
   const roleUser = roleUsers[0];

   return (
      <div className={cx('project-access')}>
         <div className={cx('access-container')}>
            <div className={cx('access-wrapper')}>
               <div style={{ marginTop: '24px' }}>
                  <NavUrl
                     url={[
                        { name: 'Projects', link: '/project' },
                        {
                           name: detailProject?.nameProject,
                           link: `/project/${detailProject?.codeProject}/black-log`,
                        },
                        {
                           name: 'Project settings',
                           link: `/project/${detailProject?.codeProject}/settings/details`,
                        },
                     ]}
                  />
               </div>
               <div className={cx('access-main')}>
                  <div className={cx('access-header')}>
                     <h1>Access</h1>
                     <Button
                        blue
                        style={{ height: '32px', fontSize: '14px' }}
                        onClick={() => {
                           setIsToggle(!isToggle);
                        }}
                     >
                        Add people
                     </Button>
                     {isToggle && <Navigation isOpen={isToggle} onClose={() => setIsToggle(false)} />}
                  </div>
                  <Table
                     detailProject={detailProject}
                     roleUser={roleUser}
                     data={members}
                     colWidthRatio={[30, 40, 20]}
                     colType={['string', 'string', 'string']}
                     labels={['Name', 'Email', 'Role', 'Action']}
                     getMembers={getMembers}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
