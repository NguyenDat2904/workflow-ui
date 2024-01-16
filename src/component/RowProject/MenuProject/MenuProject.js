import classNames from 'classnames/bind';
import style from './MenuProject.module.scss';
import Button from '~/component/Buttton/Button';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(style);
function MenuProject({ onClick, codeProject, disable, isOpen, onClose, trash, handleDeletePer, handleRestore }) {
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
      <div className={cx('wrapper', 'popup', isOpen ? 'open' : '')}>
         <div className={cx('menu')} ref={popupRef}>
            {trash ? (
               <>
                  <Button viewAll onClick={handleDeletePer}>
                     Delete permanently
                  </Button>
                  <Button viewAll backgroundNone onClick={handleRestore}>
                     Restore
                  </Button>
               </>
            ) : (
               <>
                  {disable && (
                     <Button viewAll backgroundNone to={`/project/${codeProject}/settings/details`}>
                        Project setting
                     </Button>
                  )}
                  <Button viewAll backgroundNone onClick={onClick}>
                     Move to trash
                  </Button>
               </>
            )}
         </div>
      </div>
   );
}

export default MenuProject;
