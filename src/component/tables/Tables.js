import React, { useState } from 'react';
import { ReactComponent as DotMenu } from '~/asset/icons/dotMenu.svg';
import Dropdown from '../dropdown/Dropdown';
import classNames from 'classnames/bind';
import style from './Tables.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
import { Tooltip } from 'react-tooltip';
import ModalAccept from '../ModalAccept/ModalAccept';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(style);
export function Table({
   actions,
   data,
   colWidthRatio,
   colType,
   idList,
   labels,
   roleUser,
   detailProject,
   getMembers,
   ...props
}) {
   const projectService = new WorkService();
   const [isToggleDeleteMember, setIsToggleDeleteMember] = useState(null);

   const renderTdTable = data?.map((member, index) => {
      const handleDeleteMember = async (codeProject, idMember) => {
         const deleteMember = await projectService.deleteMember(codeProject, idMember);
         if (deleteMember.status === 200) {
            getMembers();
         }
      };
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
               <div className={cx('td-table-email')}>
                  {member?.role === 'admin'
                     ? 'Administrator'
                     : member?.role === 'member'
                     ? 'Member'
                     : member?.role === 'managers'
                     ? 'Manager'
                     : ''}
               </div>
            </td>
            <td>
               {member?.role !== 'admin' && (
                  <div style={{ textAlign: 'end' }}>
                     <Dropdown
                        isClose={roleUser?.role !== 'admin'}
                        className={cx('custom-dropdown')}
                        actions={[
                           { label: 'Change role', method: () => setIsToggleDeleteMember(false) },
                           {
                              label: 'Delete member',
                              method: () => {
                                 if (index) setIsToggleDeleteMember(index);
                              },
                           },
                        ]}
                     >
                        <Button
                           data-tooltip-id="change-role"
                           data-tooltip-content="You are not an admin."
                           data-tooltip-place="top"
                           leftIcon={<MenuIcon />}
                           backgroundNone
                           disable={roleUser?.role !== 'admin'}
                           style={{
                              cursor: roleUser?.role === 'admin' ? 'pointer' : 'not-allowed',
                              height: '32px',
                              background:
                                 roleUser?.role !== 'admin' && 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))',
                           }}
                        ></Button>
                     </Dropdown>
                     {isToggleDeleteMember === index && (
                        <ModalAccept
                           btn="Delete"
                           warning
                           headerTitle={`Delete "${roleUser?.name}" ?`}
                           isOpen={isToggleDeleteMember === index}
                           isClose={() => setIsToggleDeleteMember(null)}
                           title="Members removed from a project will not be able to access the project until they are invited back to the project."
                           handleAccept={() => handleDeleteMember(detailProject?.codeProject, member?._id)}
                        />
                     )}
                     {roleUser?.role !== 'admin' && (
                        <Tooltip
                           id="change-role"
                           style={{
                              backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                              color: 'var(--ds-text-inverse, #FFFFFF)',
                              padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                              fontSize: 'var(--ds-font-size-075, 12px)',
                              maxWidth: '240px',
                              textAlign: 'center',
                           }}
                        />
                     )}
                  </div>
               )}
            </td>
         </tr>
      );
   });

   return (
      <table className={cx('table')} {...props}>
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
