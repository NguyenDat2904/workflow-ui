import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './NavUrl.module.scss';
const cx = classNames.bind(style);
function NavUrl({ url }) {
   const renderUrl = url.map((item, index) => {
      return (
         <li className={cx('item-url')}>
            <Link className={cx(index !== url.length - 1 && 'link-url')}>
               <span>{item}</span>
            </Link>
         </li>
      );
   });
   return (
      <div>
         <ol className={cx('list-url')}>{renderUrl}</ol>
      </div>
   );
}

export default NavUrl;
