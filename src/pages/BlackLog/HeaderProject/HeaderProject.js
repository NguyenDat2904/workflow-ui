import React, { Fragment, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './HeaderProject.module.scss';
import NavUrl from '~/component/NavUrl/NavUrl';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import { AddPeople, DownIcon, SearchIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import Navigation from '~/component/Navigation/Navigation';
import { ProjectContext } from '~/contexts/project/projectContext';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import Modal from '~/component/Modal/Modal';
import { useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const cx = classNames.bind(style);
function HeaderProject({
   headerName,
   rightSection,
   checkedTypes,
   setCheckedTypes,
   members,
   selectedMembers,
   setSelectedMembers,
}) {
   const form = useForm();
   const { detailProject } = useContext(ProjectContext);
   const location = useLocation();
   const [isToggle, setIsToggle] = useState(false);
   const [isToggleType, setIsToggleType] = useState(false);

   const handleCheckboxChange = (event) => {
      const value = event.target.value;
      const isChecked = event.target.checked;
      if (isChecked) {
         setCheckedTypes([...checkedTypes, value]);
      } else {
         setCheckedTypes(checkedTypes?.filter((item) => item !== value));
      }
   };
   const handleCheckboxChangeMember = (value) => {
      if (selectedMembers.includes(value)) {
         setSelectedMembers(selectedMembers.filter((item) => item !== value));
      } else {
         setSelectedMembers([...selectedMembers, value]);
      }
   };

   const queryParams = new URLSearchParams(location.search);
   const updateQueryParams = () => {
      // Xóa các query parameters cũ
      queryParams.delete('typeBug');
      queryParams.delete('typeTask');
      queryParams.delete('typeUserStory');
      queryParams.delete('assignee');
      checkedTypes?.forEach((value) => {
         if (value === 'BUG') queryParams.append(`typeBug`, 'BUG');
         else if (value === 'TASK') queryParams.append(`typeTask`, 'TASK');
         else if (value === 'USER_STORY') queryParams.append(`typeUserStory`, 'USER_STORY');
      });
      const assignee = selectedMembers?.map((item) => encodeURIComponent(item)).join('-');
      if (assignee) queryParams.append(`assignee`, assignee);
      window.history.replaceState(null, '', `${location.pathname}?${queryParams.toString()}`);
   };
   useEffect(() => {
      let arrQuery = [];
      queryParams.forEach((value) => {
         arrQuery.push(value);
      });
      const assigneeValues = queryParams.get('assignee')?.split('-') || [];
      if (assigneeValues.length > 0) setSelectedMembers(assigneeValues);
      if (arrQuery.length > 0) setCheckedTypes(arrQuery);
   }, [location.search]);
   useEffect(() => {
      updateQueryParams();
   }, [checkedTypes, selectedMembers]);

   const renderMember = members?.map((member, index) => {
      return (
         <Fragment key={member?._id}>
            <div
               className={cx('item-icon')}
               data-tooltip-id="member-tooltip"
               data-tooltip-content={member?.name}
               data-tooltip-place="top"
            >
               <label
                  htmlFor={`member-icon-${index}`}
                  className={cx(selectedMembers.includes(member?._id) && 'active')}
                  style={{ marginLeft: index !== 0 ? `${-4 * index}px` : '-0px', width: '100%' }}
               >
                  <input
                     type="checkbox"
                     className={cx('input-icon')}
                     checked={selectedMembers.includes(member?._id)}
                     id={`member-icon-${index}`}
                     name="member-icon"
                     onChange={() => handleCheckboxChangeMember(member?._id)}
                  />
                  <img
                     src={
                        member?.img
                           ? member?.img
                           : 'https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png'
                     }
                     alt=""
                     // className={cx('active')}
                     // onClick={() => handleImageClick(index, icon)}
                  />
               </label>
            </div>
            <Tooltip
               id="member-tooltip"
               style={{
                  backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                  color: 'var(--ds-text-inverse, #FFFFFF)',
                  padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                  fontSize: 'var(--ds-font-size-075, 12px)',
                  maxWidth: '240px',
               }}
            />
         </Fragment>
      );
   });

   return (
      <div className={cx('wrapper')}>
         <header className={cx('header-project')}>
            <NavUrl
               url={[
                  { name: 'Projects', link: '/project' },
                  { name: detailProject.nameProject, link: '#' },
               ]}
            />
            <div className={cx('header-title')}>
               <h1 className={cx('title-h1')}>{headerName}</h1>
               {rightSection}
            </div>
            <nav className={cx('nav-project')}>
               <div className={cx('list-nav')}>
                  <ControllerForm name="search" form={form}>
                     <Input
                        rightIcon={<SearchIcon />}
                        className={cx('custom-input')}
                        search="search"
                        width="184px"
                        placeholder="Search..."
                     />
                  </ControllerForm>
                  <div className={cx('member')}>
                     <div className={cx('group-member')}>
                        <div className={cx('list-member')}>{renderMember}</div>
                        <div className={cx('btn-add-person')}>
                           <Button
                              data-tooltip-id="add-member-tooltip"
                              data-tooltip-content="Add people"
                              data-tooltip-place="top"
                              borderRadius
                              leftIcon={<AddPeople />}
                              noChildren
                              className={cx('custom-btn')}
                              onClick={() => setIsToggle(true)}
                           ></Button>
                           <Tooltip
                              id="add-member-tooltip"
                              style={{
                                 backgroundColor: 'var(--ds-background-neutral-bold, #44546f)',
                                 color: 'var(--ds-text-inverse, #FFFFFF)',
                                 padding: 'var(--ds-space-025, 2px) var(--ds-space-075, 6px)',
                                 fontSize: 'var(--ds-font-size-075, 12px)',
                                 maxWidth: '240px',
                              }}
                           />
                           {isToggle && <Navigation isOpen={isToggle} onClose={() => setIsToggle(false)} />}
                        </div>
                     </div>
                  </div>
                  <div className={cx('filter-sprint')}>
                     <div className={cx('filter-sprint-type')}>
                        <Button
                           rightIcon={<DownIcon />}
                           backgroundNone
                           style={{ padding: '0 14px', height: '32px' }}
                           onClick={() => setIsToggleType(!isToggleType)}
                        >
                           Type
                        </Button>
                        <Modal relative isOpen={isToggleType} onClose={() => setIsToggleType(false)}>
                           <ModalSelect
                              width="160px"
                              handleChange={handleCheckboxChange}
                              checkbox
                              updateQueryParams={updateQueryParams}
                              checkedTypes={checkedTypes}
                              data={[
                                 {
                                    label: 'Bug',
                                    key: 'BUG',
                                    img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
                                 },
                                 {
                                    label: 'Story',
                                    key: 'USER_STORY',
                                    img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
                                 },
                                 {
                                    label: 'Task',
                                    key: 'TASK',
                                    img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
                                 },
                              ]}
                           />
                        </Modal>
                     </div>
                  </div>
               </div>
            </nav>
         </header>
      </div>
   );
}

export default HeaderProject;
