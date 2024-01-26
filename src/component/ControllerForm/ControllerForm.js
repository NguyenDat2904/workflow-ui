import React, { cloneElement } from 'react';
import { Controller } from 'react-hook-form';
import { DownIcon } from '../icon/icon';
import classNames from 'classnames/bind';
import style from './ControllerForm.module.scss';
const cx = classNames.bind(style);
function ControllerForm({
   onClick,
   indexSelect,
   children,
   data,
   form,
   name,
   label,
   required,
   id,
   className,
   labelLarge,
   widthImg,
   imgUser,
}) {
   return (
      <Controller
         control={form.control}
         name={name}
         render={({ field, fieldState }) => {
            return (
               <div
                  className={cx('wrapper', className, fieldState?.error?.message && 'errorValidate')}
                  style={{ height: '100%' }}
               >
                  <div className={cx('field-wrapper')}>
                     <div className={cx('form-wrapper')}>
                        {label && (
                           <label htmlFor={id} className={cx(labelLarge && 'label-email')}>
                              <span>{label}</span>
                              {required && <span style={{ color: 'red' }}> *</span>}
                           </label>
                        )}
                        <div className={cx('field-edit')}>
                           {data ? (
                              <div onClick={onClick} className={cx('img')} style={{ zIndex: indexSelect ? 10 : 0 }}>
                                 <div className={cx('imgProjectAndName')}>
                                    {data?.img ? (
                                       <img src={data?.img} alt="" className={cx('imgProject', imgUser && 'imgUser')} />
                                    ) : data?.backgroundProfile ? (
                                       <div
                                          className={cx('bgrImg')}
                                          style={{ '--_zb0g5d': widthImg, '--bgr': data?.backgroundProfile }}
                                       >
                                          <p className={cx('textBgr')}>{data?.textInBackgroundProfile}</p>
                                       </div>
                                    ) : data?.imgNone === 'none' ? (
                                       <img
                                          src="https://avatar-management.services.atlassian.com/default/48"
                                          alt=""
                                          className={cx('imgProject', imgUser && 'imgUser')}
                                       />
                                    ) : (
                                       ''
                                    )}
                                    <span className={cx('nameProject')}>{data?.label}</span>
                                    <span className={cx('iconDown')}>
                                       <DownIcon />
                                    </span>
                                 </div>
                              </div>
                           ) : (
                              ''
                           )}

                           {cloneElement(children, { ...field, ...children.props })}
                           {fieldState?.error?.message && (
                              <div className={cx('errorMessage')}>
                                 <span>{fieldState?.error?.message}</span>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            );
         }}
      ></Controller>
   );
}

export default ControllerForm;
