import React from 'react';
import SortableTask from './SortableTask';
import style from './Board.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function BoardLane({ title, data, ...props }) {
   return (
      <div className={cx('task-state')} {...props}>
         <p className={cx('state-title')}>{title}</p>
         {data.map((task, key) => (
            <SortableTask key={key}>{task}</SortableTask>
         ))}
      </div>
   );
}
