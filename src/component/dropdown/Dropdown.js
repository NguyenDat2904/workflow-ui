import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Dropdown.module.scss';
const cx = classNames.bind(style);

const Dropdown = ({ children, actions, target, className, style }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const newActions = actions.filter((value) => value !== null && value !== undefined && value !== '');
   useEffect(() => {
      const pageClickEvent = (e) => {
         // Check if the click is outside the dropdown
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false); // Close the dropdown explicitly
         }
      };
      // If the dropdown is open, listen for clicks on the page
      if (isOpen) {
         window.addEventListener('click', pageClickEvent);
      }

      // Cleanup the event listener on component unmount or before re-running the effect
      return () => {
         window.removeEventListener('click', pageClickEvent);
      };
   }, [isOpen]); // Only re-run the effect if isOpen changes

   return (
      <div className={cx('dropdown', className)} ref={dropdownRef}>
         <div className={cx('dropdown-trigger')} onClick={() => setIsOpen(!isOpen)}>
            {children}
         </div>
         {isOpen && (
            <div className={cx('dropdown-menu')}>
               {newActions.map((action, index) => (
                  <div
                     key={index}
                     className={cx('dropdown-item')}
                     onClick={() => {
                        action.method(target);
                        setIsOpen(false);
                     }}
                  >
                     {action.label}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Dropdown;
