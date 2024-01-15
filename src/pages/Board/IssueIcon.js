import React from 'react';
import { ReactComponent as Bug } from '../../asset/icons/circle.svg';
import { ReactComponent as Epic } from '../../asset/icons/epic.svg';
import { ReactComponent as Task } from '../../asset/icons/task.svg';
import { StoryIcon as Story } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from './Board.scss';

const cx = classNames.bind(style);

export function IssueIcon({ type, ...props }) {
   let icon = '';
   let iconTypeStyle;
   switch (type) {
      case 'Bug':
         icon = <Bug />;
         iconTypeStyle = cx('issue-icon', 'icon-bug');
         break;
      case 'Epic':
         icon = <Epic />;
         iconTypeStyle = cx('issue-icon', 'icon-epic');
         break;
      case 'Story':
         icon = <Story />;
         iconTypeStyle = cx('issue-icon', 'icon-story');
         break;
      default:
         icon = <Task />;
         iconTypeStyle = cx('issue-icon', 'icon-task');
         break;
   }

   return (
      <span className={iconTypeStyle} {...props}>
         {icon}
      </span>
   );
}
