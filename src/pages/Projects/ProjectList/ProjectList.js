import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ProjectList.module.scss';
import { FilterIcon, StarIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import RowProject from '~/component/RowProject/RowProject';
import { post } from '~/ultil/hpptRequest';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';
import WorkService from '~/services/work/workServices';

const cx = classNames.bind(style);
function ProjectList({ projectsList, setProjectsList, handleMoveToTrash }) {
   const projectService = new WorkService();
   const { parseuser, loadingGetProject } = useContext(UserContext);
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
         const sortName = await projectService.sortProject(parseuser?._id, sortKey.Key, sortKey.Order);
         if (sortName.status === 200) {
            setProjectsList(sortName.data.workProject);
         }
      }
   };
   return (
      <table className={cx('table-list')}>
         <thead>
            <tr>
               <td className={cx('star')} style={{ '--_1vcp0mh': '2.85%' }}>
                  <div className={cx('flex-center')}>
                     <span>
                        <StarIcon />
                     </span>
                  </div>
               </td>
               <td style={{ '--_1vcp0mh': '22%' }}>
                  <Button
                     backgroundNone
                     to="/project?sortKey=nameProject&sortOrder=ASC"
                     rightIcon={<FilterIcon />}
                     tdIcon
                     onClick={handleSortName}
                  >
                     Name
                  </Button>
               </td>
               <td style={{ '--_1vcp0mh': '12%' }}>
                  <Button
                     to="/project?sortKey=codeProject&sortOrder=ASC"
                     backgroundNone
                     rightIcon={<FilterIcon />}
                     tdIcon
                     onClick={handleSortName}
                  >
                     Key
                  </Button>
               </td>
               <td style={{ '--_1vcp0mh': '20%' }}>Type</td>
               <td style={{ '--_1vcp0mh': '36%' }}>
                  <Button backgroundNone rightIcon={<FilterIcon />} tdIcon>
                     Lead
                  </Button>
               </td>
               <td style={{ '--_1vcp0mh': '3%' }}></td>
               <td style={{ '--_1vcp0mh': '4.15%' }}></td>
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
                     return <RowProject key={project?._id} project={project} handleMoveToTrash={handleMoveToTrash} />;
                  })}
               </>
            )}
         </tbody>
      </table>
   );
}

export default ProjectList;
