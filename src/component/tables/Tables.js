import React from 'react';
import './tables.scss';
import { ReactComponent as DotMenu } from '~/asset/icons/dotMenu.svg';
import Dropdown from '../dropdown/Dropdown';

export function Table({ actions, data, colWidthRatio, colType, idList, labels, ...props }) {
   return (
      <table className="table">
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
                     <th key={key} className={`${colType && colType[index]}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                     </th>
                  ))}
                  <th></th>
               </tr>
            </thead>
         )}
         {data && (
            <tbody>
               {data.map((item, index) => (
                  <tr key={index}>
                     {Object.values(item).map((value, index) => (
                        <td key={index} className={`${colType && colType[index]}`}>
                           {value}
                        </td>
                     ))}
                     <td>
                        <Dropdown actions={actions} target={idList && idList[index]}>
                           <DotMenu />
                        </Dropdown>
                     </td>
                  </tr>
               ))}
            </tbody>
         )}
      </table>
   );
}
