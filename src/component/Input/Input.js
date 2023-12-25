import React from 'react';
import classNames from 'classnames/bind';
import style from './Input.module.scss';
import { SuccessIcon, CloseIcon } from '../icon/icon';

const cx = classNames.bind(style);

function Input({
   className,
   inputClass,
   type,
   id,
   placeholder,
   value,
   name,
   onSubmit,
   onChange,
   onClick,
   onFocus,
   formButton,
   label,
   search,
   onBlur,
   leftIcon,
   rightIcon,
   height,
   img = false,
   disableForm = false,
   ...passProps
}) {
   const classes = cx('input', leftIcon && 'paddingLeft', rightIcon && 'paddingRight', {
      [className]: className,
      inputClass,
      search,
   });
   const Comp = disableForm ? 'div' : 'form';

   return (
      <div className={cx('wrapper', search, img && 'img')} style={{ height: '100%' }}>
         <div className={cx('field-wrapper')}>
            <div className={cx('form-wrapper')}>
               {label && (
                  <label htmlFor={id}>
                     <span>{label}</span>
                  </label>
               )}
               <div className={cx('field-edit')}>
                  <div>
                     <Comp onSubmit={onSubmit} className={cx('form')}>
                        <div className={cx('form-input')}>
                           {leftIcon && (
                              <span className={cx('input-icon', 'left-icon')}>
                                 <span>{leftIcon}</span>
                              </span>
                           )}
                           <input
                              style={{ height: height }}
                              className={classes}
                              type={type}
                              {...passProps}
                              placeholder={placeholder}
                              id={id}
                              value={value}
                              name={name}
                              onClick={onClick}
                              onChange={onChange}
                              onBlur={onBlur}
                              onFocus={onFocus}
                           />
                           {rightIcon && (
                              <span className={cx('input-icon', 'right-icon')}>
                                 <span>{rightIcon}</span>
                              </span>
                           )}
                           <div className={cx(formButton ? 'formSaveInfo' : 'noneformSaveInfo')}>
                              <div className={cx('saveInfo')}>
                                 <button type="submit" className={cx('buttonSave')}>
                                    <SuccessIcon />
                                 </button>
                                 <button onClick={onClick} type="button" className={cx('buttonClose')}>
                                    <CloseIcon />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </Comp>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Input;
