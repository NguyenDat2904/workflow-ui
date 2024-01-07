import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from '../BlackLog.module.scss';
import { AddIcon, DownIcon, MenuIcon } from '~/component/icon/icon';
import RowIssue from '../RowIssue/RowIssue';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import Dropdown from '~/component/dropdown/Dropdown';
import moment from 'moment';
import SprintService from '~/services/sprint/SprintService';
const cx = classNames.bind(style);

function Sprint({ data, start = false }) {
   const form = useForm();
   const sprintService = new SprintService();
   // 1. State
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [isFocus, setIsFocus] = useState(true);
   const handleDropDown = () => {
      setDropdownOpen(!isDropdownOpen);
      const dropdown = document.getElementById('dropdown');
      dropdown.setAttribute('data-drop-target-for-element', !isDropdownOpen);
   };
   const formattedDateStart = moment(data.startDate).format('D MMM');
   const formattedDateEnd = moment(data.startEnd).format('D MMM');

   // Create Sprint
   const handleCreateSprint = async () => {
      // const createSprint = await
   };

   return (
      <div className={cx('sprint-block')}>
         <div className={cx('sprint-header')}>
            <div
               className={cx('header-left')}
               id="dropdown"
               onClick={handleDropDown}
               data-drop-target-for-element={isDropdownOpen}
            >
               <Button
                  leftIcon={<DownIcon />}
                  backgroundNone
                  noChildren
                  noHover
                  style={{ cursor: 'pointer', height: '32px' }}
               ></Button>
               <div className={cx('name-sprint')}>{data.name}</div>
               <div className={cx('date-sprint')}>
                  {formattedDateStart} - {formattedDateEnd}
               </div>
               <div className={cx('date-sprint')}>(0 issues)</div>
            </div>
            <div className={cx('header-right')}>
               <span className={cx('number-issue', 'color-issue-todo')}>
                  <span>0</span>
               </span>
               <span className={cx('number-issue', 'color-issue-process')}>
                  <span>0</span>
               </span>
               <span className={cx('number-issue', 'color-issue-done')}>
                  <span>0</span>
               </span>
               <div className={cx('setting-issue')}>
                  {data.name !== 'Blacklog' ? (
                     <>
                        <Button style={{ cursor: 'pointer', height: '32px' }}>Complete sprint</Button>
                        <Dropdown
                           className={cx('custom-dropdown')}
                           actions={[
                              { label: 'Edit sprint', method: () => {} },
                              { label: 'Delete sprint', method: () => {} },
                           ]}
                        >
                           <Button
                              leftIcon={<MenuIcon />}
                              noChildren
                              style={{ cursor: 'pointer', height: '32px' }}
                           ></Button>
                        </Dropdown>
                     </>
                  ) : (
                     <Button style={{ cursor: 'pointer', height: '32px' }} onClick={handleCreateSprint}>
                        Create sprint
                     </Button>
                  )}
               </div>
            </div>
         </div>
         {isDropdownOpen && (
            <div className={cx('sprint-main')}>
               <div className={cx('no-sprint')}>
                  <div
                     className={cx('no-sprint-content')}
                     style={{ minHeight: (data.name === 'Blacklog' || !start) && '1pc' }}
                  >
                     {data.name !== 'Blacklog' && start && <div className={cx('no-sprint-img')}></div>}
                     <div className={cx('no-sprint-text')}>
                        {data.name !== 'Blacklog' && start ? (
                           <>
                              <p>Plan your sprint</p>
                              <div>
                                 Drag issues from the <b>Backlog</b> section, or create new issues, to plan the work for
                                 this sprint. Select <b>Start sprint</b> when you're ready.
                              </div>
                           </>
                        ) : (
                           <div style={{ fontSize: '11px' }}>Your backlog is empty.</div>
                        )}
                     </div>
                  </div>
               </div>
               <div className={cx('create-issue')}>
                  <div className={cx('create-btn')} onBlur={() => setIsFocus(false)}>
                     {isFocus ? (
                        <Button
                           leftIcon={<AddIcon />}
                           backgroundNone
                           viewAll
                           className={cx('custom-btn')}
                           onClick={() => setIsFocus(false)}
                        >
                           Create issue
                        </Button>
                     ) : (
                        <form action="" className={cx('form-issue')}>
                           <ControllerForm form={form} name="issue">
                              <Input className={cx('custom-input')} autoFocus />
                           </ControllerForm>
                        </form>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Sprint;
