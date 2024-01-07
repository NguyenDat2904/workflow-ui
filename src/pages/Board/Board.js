import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import Timer from '../../asset/icons/timer.svg';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './SortableTask';

const cx = classNames.bind(style);

export default function Board() {
   const [tasks, setTasks] = useState(['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']);
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
         <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => console.log({ active, over })}>
            <div className={cx('task-board')}>
               <div className={cx('task-state')}>
                  <p className={cx('state-title')}>To Do</p>
                  <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                     {tasks.map((task) => (
                        <SortableTask key={task} id={task}>
                           {task}
                        </SortableTask>
                     ))}
                  </SortableContext>
               </div>
            </div>
         </DndContext>
      </div>
   );
}
