import React from 'react';
import style from './Board.scss';
import classNames from 'classnames/bind';
import { Card } from '../../component/cards/Cards';

const cx = classNames.bind(style);

export default function SortableTask(props) {
   return (
      <div>
         <Card className={cx('sortable-task')}>{props.children}</Card>
      </div>
   );
}
