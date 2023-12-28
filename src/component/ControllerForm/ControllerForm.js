import React, { cloneElement } from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import style from './ControllerForm.module.scss';
const cx = classNames.bind(style);
function ControllerForm({ children, form, name, label, required, id, className, labelLarge }) {
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
                              {required && <span>*</span>}
                           </label>
                        )}
                        <div className={cx('field-edit')}>
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
