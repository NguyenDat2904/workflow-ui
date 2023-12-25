import React from 'react';
import classNames from 'classnames/bind';
import style from './Modal.module.scss';
const cx = classNames.bind(style);

function Modal({ className, width, locationTransform, children, onBlur, maxWidth }) {
   return (
      <div
         className={cx('wrapper', className)}
         style={{ transform: `translate(${locationTransform}, 52px)` }}
         onBlur={onBlur}
      >
         <div className={cx('width')} style={{ '--_1d8u6ab': width, width: maxWidth }}>
            <div className={cx('height')} style={{ maxHeight: 'calc(100vh - 200px)' }}>
               {children}
            </div>
         </div>
      </div>
   );
}

export default Modal;
