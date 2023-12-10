import React from 'react';
import { SuccessIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import styles from './recentActivityOf.module.scss';
const cx = classNames.bind(styles);
const RecentActivityOfUser = () => {
    return (
        <div className={cx('recentActivityOf')}>
            <div className={cx('titleRecentActivityOf')}>
                <h4 className={cx('titleWorked')}>
                    Worked on <br />
                    <p className={cx('worked')}>Others will only see what they can access.</p>
                </h4>
                <h5 className={cx('viewAll')}>View all</h5>
            </div>
            <div className={cx('newesWork')}>
                <div className={cx('ingredient')}>
                    <span className={cx('ingredientIcon')}>
                        <SuccessIcon />
                    </span>
                    <h4 className={cx('ingredientDetail')}>
                        Getting <br />
                        <p className={cx('ingredientDetailName')}>vanhungn</p>
                    </h4>
                </div>
            </div>
        </div>
    );
};
export default RecentActivityOfUser;
