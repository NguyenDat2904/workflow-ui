import React from 'react';
import style from './Board.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function TaskDisplay(key, task) {
   return <div></div>;
}

export default function BoardLane({ id, title, data, ...props }) {
   return (
      <div className={cx('task-state')} {...props}>
         <p className={cx('state-title')}>{title}</p>
         {data.map((task, key) => (
            <div key={key}>
               <p>{task.summary}</p>
            </div>
         ))}
      </div>
   );
}
