import React from 'react';
import './tables.scss';
import { ReactComponent as DotMenu } from '~/asset/icons/dotMenu.svg';
import Dropdown from '../dropdown/Dropdown';

export function Table({ actions, data, colWidthRatio, ...props }) {
   const colType = Object.values(data[0]).map((value) => typeof value);

   return (
      <table className="table">
         <colgroup>
            {colWidthRatio.map((width, index) => (
               <col key={index} style={{ width: `${width}%` }} />
            ))}
            <col style={{ width: '1%' }} /> {/* Add an extra column */}
         </colgroup>
         <thead>
            <tr>
               {Object.keys(data[0]).map((key, index) => (
                  <th key={key} className={`${colType[index]}`}>
                     {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
               ))}
               <th></th>
            </tr>
         </thead>
         <tbody>
            {data.map((item, index) => (
               <tr key={index}>
                  {Object.values(item).map((value, index) => (
                     <td key={index} className={`${colType[index]}`}>
                        {value}
                     </td>
                  ))}
                  <td>
                     <Dropdown actions={actions}>
                        <DotMenu />
                     </Dropdown>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
