import React from 'react';
import { ReactComponent as Bug } from '../../asset/icons/circle.svg';
import { ReactComponent as Epic } from '../../asset/icons/epic.svg';
import { ReactComponent as Task } from '../../asset/icons/task.svg';
import { ReactComponent as Subtask } from '../../asset/icons/subtask.svg';
import { StoryIcon as Story } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from './Board.module.scss';

const cx = classNames.bind(style);

export function IssueIcon({ type, ...props }) {
   let icon = '';
   let iconTypeStyle;
   switch (type) {
      case 'BUG':
         icon = <Bug />;
         iconTypeStyle = cx('issue-icon', 'icon-bug');
         break;
      case 'TASK':
         icon = <Task />;
         iconTypeStyle = cx('issue-icon', 'icon-task');
         break;
      case 'USER_STORY':
         icon = <Story />;
         iconTypeStyle = cx('issue-icon', 'icon-story');
         break;
      case 'SUB_TASK':
         icon = <Subtask />;
         iconTypeStyle = cx('issue-icon', 'icon-subtask');
         break;
      default:
         icon = <Epic />;
         iconTypeStyle = cx('issue-icon', 'icon-epic');
         break;
   }

   return (
      <span className={iconTypeStyle} {...props}>
         {icon}
      </span>
   );
}
