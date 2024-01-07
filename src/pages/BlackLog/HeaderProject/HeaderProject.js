import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderProject.module.scss';
import NavUrl from '~/component/NavUrl/NavUrl';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import Input from '~/component/Input/Input';
import { AddPeople, DownIcon, SearchIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';

const cx = classNames.bind(style);
function HeaderProject() {
   const form = useForm();

   return (
      <div className={cx('wrapper')}>
         <header className={cx('header-project')}>
            <NavUrl
               url={[
                  { name: 'Projects', link: '/project' },
                  { name: 'WF', link: '#' },
               ]}
            />
            <div className={cx('header-title')}>
               <h1 className={cx('title-h1')}>Backlog</h1>
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
                        <div className={cx('list-member')}>
                           <div className={cx('item-icon')}>
                              <label htmlFor="member-icon">
                                 <input
                                    type="radio"
                                    className={cx('input-icon')}
                                    // checked={watchImageSrc === icon}
                                    id="member-icon"
                                    // defaultValue={icon}
                                    // onChange={() => handleImageClick(index, icon)}
                                 />
                                 <img
                                    src="https://secure.gravatar.com/avatar/96bd7f66bb5903b…2.prod.public.atl-paas.net%2Fdefault-avatar-5.png"
                                    alt=""
                                    className={cx('active')}
                                    // onClick={() => handleImageClick(index, icon)}
                                 />
                              </label>
                           </div>
                           <div className={cx('item-icon')}>
                              <label htmlFor="member-icon">
                                 <input
                                    type="radio"
                                    className={cx('input-icon')}
                                    // checked={watchImageSrc === icon}
                                    id="member-icon"
                                    // defaultValue={icon}
                                    // onChange={() => handleImageClick(index, icon)}
                                 />
                                 <img
                                    src="https://secure.gravatar.com/avatar/96bd7f66bb5903b…2.prod.public.atl-paas.net%2Fdefault-avatar-5.png"
                                    alt=""
                                    className={cx('active')}
                                    // onClick={() => handleImageClick(index, icon)}
                                 />
                              </label>
                           </div>
                           <div className={cx('item-icon', 'last-icon')}>
                              <label htmlFor="member-icon">
                                 <input
                                    type="radio"
                                    className={cx('input-icon')}
                                    // checked={watchImageSrc === icon}
                                    id="member-icon"
                                    // defaultValue={icon}
                                    // onChange={() => handleImageClick(index, icon)}
                                 />
                                 <img
                                    src="https://secure.gravatar.com/avatar/96bd7f66bb5903b…2.prod.public.atl-paas.net%2Fdefault-avatar-5.png"
                                    alt=""
                                    className={cx('active')}
                                    // onClick={() => handleImageClick(index, icon)}
                                 />
                              </label>
                           </div>
                        </div>
                        <div className={cx('btn-add-person')}>
                           <Button
                              borderRadius
                              leftIcon={<AddPeople />}
                              noChildren
                              className={cx('custom-btn')}
                           ></Button>
                        </div>
                     </div>
                  </div>
                  <div className={cx('filter-sprint')}>
                     <Button rightIcon={<DownIcon />} backgroundNone style={{ padding: '0 14px', height: '32px' }}>
                        Epic
                     </Button>
                     <Button rightIcon={<DownIcon />} backgroundNone style={{ padding: '0 14px', height: '32px' }}>
                        Type
                     </Button>
                  </div>
               </div>
            </nav>
         </header>
      </div>
   );
}

export default HeaderProject;
