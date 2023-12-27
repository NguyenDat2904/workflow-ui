import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './recentActivityOf.module.scss';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(styles);
const RecentActivityOfUser = ({ dataListWork }) => {
    const workServices= new WorkService()
    const [dataListProject,setDataListProject]=useState()
    const APIListWork=async()=>{
        const user = localStorage.getItem('user');
        const parseuser = JSON.parse(user);
        const dataProject=await workServices.getListProject(parseuser?._id)
        setDataListProject(dataProject.data.workProject)
    }
    useEffect(()=>{
        APIListWork()
    },[])
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
                            <img
                                src="https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=xsmall"
                                alt=""
                            />

                            <h4 className={cx('ingredientDetail')}>
                                {product.nameWork} <br />
                                <p className={cx('ingredientDetailName')}>
                                    creation time: {product.dateCreated?.slice(0, 10)}
                                </p>
                            </h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default RecentActivityOfUser;
