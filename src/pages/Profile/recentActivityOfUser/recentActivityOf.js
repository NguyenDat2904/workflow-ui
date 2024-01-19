import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './recentActivityOf.module.scss';
import IssueService from '~/services/issue/issueService';
const cx = classNames.bind(styles);
const RecentActivityOfUser = () => {
   const issueService = new IssueService();
   const [dataListWork, setDataListWork] = useState([]);
   const APIListProject = async () => {
      const dataProject = await issueService.getIssueSearch();
      const limitIssue = dataProject?.data?.data.slice(0, 10);
      setDataListWork(limitIssue);
   };
   useEffect(() => {
      APIListProject();
   }, []);

   return (
      <div className={cx('recentActivityOf')}>
         <div className={cx('titleRecentActivityOf')}>
            <h4 className={cx('titleWorked')}>
               Worked on <br />
               <p className={cx('worked')}>Others will only see what they can access.</p>
            </h4>
            <Link to="/profile/view-all-list-work">
               <h5 className={cx('viewAll')}>View all</h5>
            </Link>
         </div>
         <div className={cx('newesWork')}>
            {dataListWork?.map((product) => {
               return (
                  <div key={product?._id} className={cx('ingredient')}>
                     <img src={product.img} alt="" />

                     <h4 className={cx('ingredientDetail')}>
                        {product.summary} <br />
                        <p className={cx('ingredientDetailName')}>creation time: {product.startDate?.slice(0, 10)}</p>
                     </h4>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
export default RecentActivityOfUser;
