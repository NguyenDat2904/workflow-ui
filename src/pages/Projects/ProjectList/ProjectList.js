import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ProjectList.module.scss';
import { FilterIcon, StarIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import RowProject from '~/component/RowProject/RowProject';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';
import WorkService from '~/services/work/workServices';

const cx = classNames.bind(style);
function ProjectList({ projectsList, setProjectsList, handleMoveToTrash, trash, handleRestore, handleDeletePer }) {
   const projectService = new WorkService();
   const { loadingGetProject } = useContext(UserContext);
   const { accessToken } = useContext(AuthContext);

   const location = useLocation();
   //    1. State
   const [sortKey, setSortKey] = useState({
      Key: '',
      Order: '',
   });
   //    2. UseEffect
   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const queryKey = searchParams.get('sortKey');
      const queryOrder = searchParams.get('sortOrder');
      setSortKey((prev) => ({
         ...prev,
         Key: queryKey || '',
         Order: queryOrder || '',
      }));
   }, [location]);

   //    3.Func
   const handleSortName = async () => {
      if (accessToken) {
         const sortName = await projectService.getListProject({
            deleteProject: trash ? true : false,
            sortKey: sortKey.Key,
            sortOrder: sortKey.Order,
         });
         if (sortName.status === 200) {
            setProjectsList(sortName.data.data);
         }
      }
   };
   return (
      <table className={cx('table-list')}>
         <thead>
            <tr>
               {!trash && (
                  <td className={cx('star')} style={{ '--_1vcp0mh': '2.85%' }}>
                     <div className={cx('flex-center')}>
                        <span>
                           <StarIcon />
                        </span>
                     </div>
                  </td>
               )}
               <td style={{ '--_1vcp0mh': '22%', fontSize: trash && '12px', color: trash && '#626f86' }}>
                  <Button
                     backgroundNone
                     to={
                        trash
                           ? '/project/trash?sortKey=nameProject&sortOrder=ASC'
                           : ' /project?sortKey=nameProject&sortOrder=ASC'
                     }
                     rightIcon={<FilterIcon />}
                     tdIcon
                     onClick={handleSortName}
                  >
                     Name
                  </Button>
               </td>
               <td style={{ '--_1vcp0mh': '12%', fontSize: trash && '12px', color: trash && '#626f86' }}>
                  <Button
                     to={
                        trash
                           ? '/project/trash?sortKey=codeProject&sortOrder=ASC'
                           : '/project?sortKey=codeProject&sortOrder=ASC'
                     }
                     backgroundNone
                     rightIcon={<FilterIcon />}
                     tdIcon
                     onClick={handleSortName}
                  >
                     Key
                  </Button>
               </td>
               {!trash && (
                  <td style={{ '--_1vcp0mh': '20%', fontSize: trash && '12px', color: trash && '#626f86' }}>Type</td>
               )}
               <td
                  style={{ '--_1vcp0mh': trash ? '25%' : '30%', fontSize: trash && '12px', color: trash && '#626f86' }}
               >
                  <Button backgroundNone rightIcon={<FilterIcon />} tdIcon>
                     Lead
                  </Button>
               </td>
               <td style={{ '--_1vcp0mh': trash ? '25%' : '3%', fontSize: trash && '12px', color: trash && '#626f86' }}>
                  {trash && 'Moved to trash on'}
               </td>
               <td
                  style={{
                     '--_1vcp0mh': trash ? '14.15%' : '4.15%',
                     fontSize: trash && '12px',
                     color: trash && '#626f86',
                  }}
               >
                  {trash && 'Permanently deleting'}
               </td>
               {trash && <td></td>}
            </tr>
         </thead>
         <tbody>
            {loadingGetProject ? (
               <tr width="100%">
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
                  <td style={{ padding: '0 1px' }}>
                     <Skeleton width="100%" height="48px" />
                  </td>
               </tr>
            ) : (
               <>
                  {projectsList?.map((project) => {
                     return (
                        <RowProject
                           key={project?._id}
                           project={project}
                           handleMoveToTrash={handleMoveToTrash}
                           handleRestore={handleRestore}
                           handleDeletePer={handleDeletePer}
                           trash={trash}
                        />
                     );
                  })}
               </>
            )}
         </tbody>
      </table>
   );
}

export default ProjectList;
