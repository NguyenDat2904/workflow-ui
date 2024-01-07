import React from 'react';
import classNames from 'classnames/bind';
import style from './ListBlog.module.scss';
const cx = classNames.bind(style);

function ListBlog({ data }) {
   const render = data.list.map((prev, index) => {
      return (
         <li className={cx('item')} key={index}>
            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30" width="32" height="30">
               <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
            </svg>
            <p>
               <strong>{prev.strong}</strong>
               {prev.desc}
            </p>
         </li>
      );
   });

   return (
      <div className={cx('row')}>
         <div className={cx('column')}>
            <div className={cx('heading')}>
               <h2>{data.title}</h2>
            </div>
            <div className={cx('list-blog')}>
               <ul className={cx('list-item')}>{render}</ul>
            </div>
         </div>
         <div className={cx('column', 'right')}>
            <div className={cx('img')}>
               <img src={data.img} alt="board" />
            </div>
         </div>
      </div>
   );
}

export default ListBlog;
