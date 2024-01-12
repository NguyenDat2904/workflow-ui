import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Modal.module.scss';
const cx = classNames.bind(style);
function Modal({ className, width, locationTransform, children, maxWidth, isOpen, onClose, relative, height }) {
   const popupRef = useRef(null);
   useEffect(() => {
      const handleOutsideClick = (event) => {
         if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
         }
      };

      const handleEscapeKey = (event) => {
         if (event.key === 'Escape') {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleOutsideClick);
         document.addEventListener('keydown', handleEscapeKey);
      }

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [isOpen, onClose]);

   return (
      <div className={cx('popup', isOpen ? 'open' : '')}>
         <div
            className={cx('wrapper', className)}
            style={{
               transform: `translate(${locationTransform}, 52px)`,
               position: relative ? '' : 'fixed',
               boxShadow: relative
                  ? ''
                  : 'var(--ds-shadow-overlay, 0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31))',
               overflow: relative ? '' : 'auto',
            }}
            ref={popupRef}
         >
            <div className={cx('width')} style={{ '--_1d8u6ab': width, width: maxWidth }}>
               <div
                  className={cx('height')}
                  style={{ maxHeight: 'calc(100vh - 200px)', overflow: relative ? '' : 'auto', height: height }}
               >
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Modal;
