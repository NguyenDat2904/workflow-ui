import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import HeaderProject from '../BlackLog/HeaderProject/HeaderProject';

const cx = classNames.bind(style);

export default function Board() {
   const rightSection = (
      <div className={cx('sprint-buttons')}>
         <Button buttonStyle="filled">Complete Sprint</Button>
         <Button>Edit Sprint</Button>
      </div>
   );

   return (
      <div className={cx('board')}>
         <HeaderProject headerName={'Board'} rightSection={rightSection} />
         <div className={cx('task-board')}>
            <div className={cx('task-status')}>
               <div>To do</div>
               <div>In progress</div>
               <div>Review</div>
               <div>Done</div>
            </div>
         </div>
      </div>
   );
}
