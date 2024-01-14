import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { SearchIcon } from '~/component/icon/icon';
import Pagination from '~/component/Pagination/Pagination';
import WorkService from '~/services/work/workServices';
import UserService from '~/services/user/userServices';
import styles from './viewAllListWork.module.scss';
const cx = classNames.bind(styles);

const ViewAllListWork = () => {
   const workServices = new WorkService();
   const userServices = new UserService();
   const [dataListProject, setDataListProject] = useState([]);
   const [dataListWork, setDataListWork] = useState([]);
   const [dataUserProfile, setDataUserProfile] = useState({});
   const [page, setPage] = useState(null);
   const [valueInput, setVaLueInput] = useState('');
   const APIListProjetc = async () => {
      const dataProject = await workServices.getListProject();
      setDataListProject(dataProject.data.data);
      const APIuser = await userServices.getUserProfile({ deleteProject: false });
      setDataUserProfile(APIuser.data);
   };
   useEffect(() => {
      APIListProjetc();
   }, []);

   const handleChangeInput = (e) => {
      setVaLueInput(e.target.value);
   };
   const handleSelect = async (e) => {
      console.log(e.target.value);
      if (e.target.value !== '') {
         const listWork = await workServices.getIssues(e.target.value, { limit: 5 });
         setDataListWork(listWork?.data?.dataListIssues);
         setPage(listWork?.data?.totalPage);
      } else {
         setDataListWork([]);
      }
   };
   const resultdataListWork =
      dataListWork === undefined
         ? dataListWork
         : dataListWork.filter((item) => {
              if (valueInput !== '') {
                 return valueInput && item.summary && item.summary.toLowerCase().includes(valueInput);
              }
              return true;
           });
   return (
      <div className={cx('ViewAllListWork')}>
         <p className={cx('headerWorkOn')}>
            <Link to="/profile">
               <span className={cx('linkProfile')}>Back </span>
            </Link>
            / Worked on
         </p>
         <h2 className={cx('titleWorkOn')}>Worked on</h2>
         <div className={cx('WorkOn')}>
            <div className={cx('searchTitle')}>
               <p className={cx('Recent')}>Recent</p>
               <div className={cx('filterTitle')}>
                  <SearchIcon />
                  <input
                     onChange={handleChangeInput}
                     className={cx('inputSearchTitle')}
                     type="text"
                     placeholder="Filter by title"
                  />
               </div>
            </div>
            <div className={cx('workOnAndviewed')}>
               <p style={{ color: '#0c66e4' }} className={cx('view')}>
                  Worked on
               </p>
            </div>
            <div className={cx('bgrView')}>
               <div className={cx('bgrViewChildren')}></div>
            </div>
            <div className={cx('implementerMenber')}>
               <p className={cx('project')}>Project</p>
               <div className={cx('viewWorkSelect')}>
                  <div className={cx('nameProject')}>
                     <img
                        className={cx('imgFile')}
                        src="https://cdn-icons-png.flaticon.com/512/124/124837.png"
                        alt=""
                     />
                     <div className={cx('nameProjectRight')}>
                        <p className={cx('nameUser')}>
                           Name user : <span className={cx('nameUserspan')}>{dataUserProfile.name}</span>
                        </p>
                     </div>
                  </div>
                  <p>Your created: {dataUserProfile.createdAt?.slice(0, 10)}</p>
                  <div className={cx('positionSelect')}>
                     <div className={cx('select')}>
                        <select className={cx('selectNameProject')} onChange={handleSelect} name="" id="">
                           <option className={cx('opacity')} value="">
                              Project...
                           </option>
                           {dataListProject?.map((product) => {
                              return (
                                 <option key={product?._id} value={product?.codeProject}>
                                    {product.nameProject}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                  </div>
               </div>
               <p className={cx('project')}>List Work</p>

               {resultdataListWork?.map((product) => {
                  return (
                     <div key={product?._id} className={cx('viewWorkSelect')}>
                        <div className={cx('nameProject')}>
                           <img className={cx('imgFile')} src={product?.img} alt="" />
                           <div className={cx('nameProjectRight')}>
                              <h6 className={cx('nameP')}>{product.summary}</h6>
                              <p className={cx('nameUser')}>go to maker sample</p>
                           </div>
                        </div>
                        <p>Your created: {product.createdAt?.slice(0, 10)}</p>
                     </div>
                  );
               })}
            </div>
            <div className={cx('page')}>
               {dataListWork?.length > 0 &&<Pagination page={page} />}
            </div>
         </div>
      </div>
   );
};
export default ViewAllListWork;
