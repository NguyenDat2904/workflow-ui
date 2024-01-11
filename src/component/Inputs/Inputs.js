import React from 'react';
import classNames from 'classnames/bind';
import style from './inputs.scss';

const cx = classNames.bind(style);

export function Input({ className, error, ...props }) {
   return <input className={cx('input', error && 'input-error', className)} {...props} />;
}

export function Button({ children, buttonStyle, className, ...props }) {
   let buttonType;
   switch (buttonStyle) {
      case 'light':
         buttonType = cx('button-light');
         break;
      case 'filled':
         buttonType = cx('button-filled');
         break;
      case 'disabled':
         buttonType = cx('button-disabled');
         break;
      default:
         buttonType = cx('button-light');
         break;
   }

   return (
      <button className={cx('button', buttonType, className)} {...props}>
         {children}
      </button>
   );
}

export function Form({ children, className, ...props }) {
   return (
      <form className={cx('form', className)} {...props}>
         {children}
      </form>
   );
}
