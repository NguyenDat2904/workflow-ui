import React from 'react';
import classNames from 'classnames/bind';
import style from './Input.module.scss';
const cx = classNames.bind(style);

function Input({ className, inputClass, type, search, leftIcon, rightIcon, width, ...passProps }) {
   const classes = cx('input', leftIcon && 'paddingLeft', rightIcon && 'paddingRight', {
      [className]: className,
      inputClass,
      search,
   });

   return (
      <div className={cx('form-input')}>
         {leftIcon && (
            <span className={cx('input-icon', 'left-icon')}>
               <span>{leftIcon}</span>
            </span>
         )}
         <input className={classes} type={type} {...passProps} />
         {rightIcon && (
            <span className={cx('input-icon', 'right-icon')}>
               <span>{rightIcon}</span>
            </span>
         )}
      </div>
   );
}

export default Input;
