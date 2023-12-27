import React from 'react';
import classNames from 'classnames/bind';
import styles from './taskMaster.module.scss';
const cx = classNames.bind(styles);
const TaskMaster = ({ dataListWorkTaskMaster }) => {
   return dataListWorkTaskMaster?.map((product) => {
      return product?.creatorID?.map((item) => {
         return (
            <div key={product?._id} className={cx('viewWorkSelect')}>
               <div className={cx('nameProject')}>
                  <img
                     className={cx('imgFile')}
                     src="data:image/png;base64,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"
                     alt=""
                  />
                  <div className={cx('nameProjectRight')}>
                     <h6 className={cx('nameP')}>{item.name}</h6>
                     <p className={cx('nameUser')}>{item.email} go to maker sample</p>
                  </div>
               </div>
               <p>Your created: {product.createdAt?.slice(0, 10)}</p>
            </div>
         );
      });
   });
};
export default TaskMaster;
