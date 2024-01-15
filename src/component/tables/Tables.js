import React from 'react';
import { ReactComponent as DotMenu } from '~/asset/icons/dotMenu.svg';
import Dropdown from '../dropdown/Dropdown';
import classNames from 'classnames/bind';
import style from './Tables.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
const cx = classNames.bind(style);
export function Table({ actions, data, colWidthRatio, colType, idList, labels, ...props }) {
   const renderTdTable = data.dataMember?.map((member, index) => {
      console.log(data);
      return (
         <tr key={index} className={cx('tr-table')}>
            <td className={cx('td-table')}>
               <div>
                  <span className={cx('td-user')}>
                     <div className={cx('td-user-img')}>
                        <img
                           src={
                              member?.img
                                 ? member?.img
                                 : 'https://i1.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar-5.png?ssl=1'
                           }
                           alt=""
                        />
                     </div>
                     <div className={cx('td-user-name')}>{member?.name}</div>
                  </span>
               </div>
            </td>
            <td className={cx('td-table')}>
               <div className={cx('td-table-email')}>{member?.email}</div>
            </td>
            <td className={cx('td-table')}>
               <div className={cx('td-table-email')}>{}</div>
            </td>
            <td>
               <div>
                  <Button leftIcon={<MenuIcon />} backgroundNone style={{ height: '32px' }}></Button>
               </div>
            </td>
         </tr>
      );
   });

   return (
      <table className={cx('table')}>
         {colWidthRatio && (
            <colgroup>
               {colWidthRatio.map((width, index) => (
                  <col key={index} style={{ width: `${width}%` }} />
               ))}
               <col style={{ width: '1%' }} /> {/* Add an extra column */}
            </colgroup>
         )}
         {labels && (
            <thead>
               <tr>
                  {labels.map((key, index) => (
                     <th key={index} className={cx('table-th')}>
                        {key}
                     </th>
                  ))}
                  <th></th>
               </tr>
            </thead>
         )}
         {data && <tbody>{renderTdTable}</tbody>}
      </table>
   );
}
