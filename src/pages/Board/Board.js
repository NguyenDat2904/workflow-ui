import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Board.scss';
import { Button } from '../../component/Inputs/Inputs';
import Timer from '../../asset/icons/timer.svg';
import BoardLane from './BoardLane';
import { DragDropContext } from 'react-beautiful-dnd';

const cx = classNames.bind(style);

export default function Board() {
   function hangleDragEnd(result) {}

   const [taskData, setTaskData] = useState({
      tasks: {
         1: { id: 1, content: 'Task 1' },
         2: { id: 2, content: 'Task 2' },
         3: { id: 3, content: 'Task 3' },
         4: { id: 4, content: 'Task 4' },
         5: { id: 5, content: 'Task 5' },
         6: { id: 6, content: 'Task 6' },
      },
      columns: {
         1: {
            id: 1,
            title: 'toDo',
            taskIds: [1, 2, 3, 4, 5],
         },
         2: {
            id: 2,
            title: 'inProgress',
            taskIds: [6],
         },
         3: {
            id: 3,
            title: 'done',
            taskIds: [],
         },
      },
      columnOrder: [1, 2, 3],
   });

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
         <DragDropContext onDragEnd={hangleDragEnd}>
            <div className={cx('task-board')}>
               {taskData.columnOrder.map((columnId) => {
                  const column = taskData.columns[columnId];
                  const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId].content);
                  return <BoardLane key={column.id} title={column.title} data={tasks} />;
               })}
            </div>
         </DragDropContext>
      </div>
   );
}
