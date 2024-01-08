import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Select.module.scss';

const cx = classNames.bind(style);

export default function Select({ options, prompt, ...props }) {
   const [isFocused, setIsFocused] = useState(false);

   const handleBlur = () => {
      setIsFocused(false);
   };

   return (
      <div className={cx('custom-select')}>
         <select className={cx('select')} onBlur={handleBlur} onClick={() => setIsFocused(!isFocused)} {...props}>
            {prompt && (
               <option className={cx('option')} value="">
                  {prompt}
               </option>
            )}
            {options?.map((option, index) => (
               <option key={index} className={cx('option')} value={option?.value}>
                  <span>{option.label}</span>
               </option>
            ))}
         </select>
         <span
            className={cx('custom-arrow', {
               'is-focused': isFocused,
               'not-focused': !isFocused,
            })}
         ></span>
      </div>
   );
}
