import React, { useRef, useEffect, useState } from 'react';
import './Dropdown.scss';

const Dropdown = ({ children, actions, target }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

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
      <div className="dropdown" ref={dropdownRef}>
         <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
            {children}
         </div>
         {isOpen && (
            <div className="dropdown-menu">
               {actions.map((action, index) => (
                  <div key={index} className="dropdown-item" onClick={() => action.method(target)}>
                     {action.label}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Dropdown;
