import React from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import Timer from '../../asset/icons/timer.svg';

const cx = classNames.bind(style);

export default function Board() {
   return (
      <div className={cx('board')}>
         <div className={cx('header')}>
            <div className={cx('title')}>
               <h3>Project Board</h3>
               <p>Subheading</p>
            </div>
            <div className={cx('actions')}>
               <img src={Timer} alt="Timer" />
               <p>End in 1 day</p>
               <Button>Complete Sprint</Button>
            </div>
         </div>
         <div className={cx('task-board')}></div>
      </div>
   );
}
