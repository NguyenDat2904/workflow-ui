import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import style from './Board.scss';
import classNames from 'classnames/bind';
import { Card } from '../../component/cards/Cards';

const cx = classNames.bind(style);

export default function SortableTask(props) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: props.id,
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
         <Card className={cx('sortable-task')}>{props.children}</Card>
      </div>
   );
}
