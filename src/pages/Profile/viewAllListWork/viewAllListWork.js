import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/hook/context/context';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import TaskMaster from '../taskMaster/taskMaster';
import { SearchIcon } from '~/component/icon/icon';
import WorkService from '~/services/work/workServices';
import styles from './viewAllListWork.module.scss';
const cx = classNames.bind(styles);
const ViewAllListWork = () => {
   const { dataUserProfile } = useContext(AppContext);
   const workServices = new WorkService();
   const [dataListProject, setDataListProject] = useState([]);
   const [dataListWork, setDataListWork] = useState([]);
   const user = localStorage.getItem('user');
   const parseuser = JSON.parse(user);
   const APIListProjetc = async () => {
      const dataProject = await workServices.getListProject(parseuser?._id);
      setDataListProject(dataProject.data.workProject);
   };
   useEffect(() => {
      APIListProjetc();
   }, []);

   const [stylesView, setStylesView] = useState(true);
   const [valueInput, setVaLueInput] = useState('');
   const hendleStylesView = (bool) => {
      setStylesView(bool);
   };
   const handleChangeInput = (e) => {
      setVaLueInput(e.target.value);
   };
   const handleSelect = async (e) => {
      if (e.target.value !== '') {
         const listWork = await workServices.listWork(e.target.value);
         setDataListWork(listWork.data);
      } else {
         setDataListWork([]);
      }
   };
   const resultdataListWork =
      dataListWork.listWorkID === undefined
         ? dataListWork.listWorkID
         : dataListWork.listWorkID.filter((item) => {
              if (valueInput !== '') {
                 return valueInput && item.nameWork && item.nameWork.toLowerCase().includes(valueInput);
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
                     style={{ cursor: stylesView ? 'auto' : 'not-allowed' }}
                     className={cx('inputSearchTitle')}
                     type="text"
                     placeholder="Filter by title"
                  />
               </div>
            </div>
            <div className={cx('workOnAndviewed')}>
               <p
                  onClick={() => hendleStylesView(true)}
                  style={{ color: stylesView ? '#0c66e4' : '#172b4d' }}
                  className={cx('view')}
               >
                  Worked on
               </p>
               <p
                  onClick={() => hendleStylesView(false)}
                  style={{ color: stylesView ? '#172b4d' : '#0c66e4', transition: 'all 1s' }}
                  className={cx('view')}
               >
                  Taskmaster
               </p>
            </div>
            <div className={cx('bgrView')}>
               <div
                  style={{ marginLeft: stylesView ? '0' : '80px', transition: 'all 1s' }}
                  className={cx('bgrViewChildren')}
               ></div>
            </div>
            {stylesView === false ? (
               <TaskMaster dataListWorkTaskMaster={dataListWork} />
            ) : (
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
                           <h6 className={cx('nameP')}>{dataListWork.nameProject}</h6>
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
                                    <option key={product?._id} value={product.nameProject}>
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
                              <img
                                 className={cx('imgFile')}
                                 src="https://media.istockphoto.com/id/1256489977/vector/tasks-check-checklist-blue-icon.jpg?s=612x612&w=0&k=20&c=dUctYWRSmMz1uiSFCCcJUKOyeoxVbvPuLugf8CLQiSo="
                                 alt=""
                              />
                              <div className={cx('nameProjectRight')}>
                                 <h6 className={cx('nameP')}>{product.nameWork}</h6>
                                 <p className={cx('nameUser')}>{product.jobCode} go to maker sample</p>
                              </div>
                           </div>
                           <p>Your created: {product.createdAt?.slice(0, 10)}</p>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
};
export default ViewAllListWork;
