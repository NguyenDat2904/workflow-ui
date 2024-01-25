import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './LoadingBox.module.scss';
const cx = classNames.bind(style);
function LoadingBox() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('boxes')}>
            <div className={cx('box')}>
               <div />
               <div />
               <div />
               <div />
            </div>
            <div className={cx('box')}>
               <div />
               <div />
               <div />
               <div />
            </div>
            <div className={cx('box')}>
               <div />
               <div />
               <div />
               <div />
            </div>
            <div className={cx('box')}>
               <div />
               <div />
               <div />
               <div />
            </div>
         </div>
         <Link
            className={cx('dribbble')}
            href="https://dribbble.com/shots/5533600-Loading-boxes"
            target="_blank"
            rel="noreferrer"
         >
            {/* <img
               src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
               alt=""
            /> */}
         </Link>
      </div>
   );
}

export default LoadingBox;
