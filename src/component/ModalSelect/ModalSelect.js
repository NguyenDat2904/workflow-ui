import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalSelect.module.scss';
const cx = classNames.bind(style);

function ModalSelect({
   data,
   width,
   widthImg,
   setValue,
   onClose,
   handleSubmit,
   status,
   right,
   percent50,
   heightRow,
   checkbox,
   handleChange,
   checkedTypes,
   updateQueryParams,
}) {
   const renderOptions = data?.map((option, index) => {
      const handleOptionClick = (option) => {
         if (setValue) {
            setValue(option);
         }
      };
      return (
         <label htmlFor={option?.label} key={index}>
            <div
               style={{ height: heightRow }}
               className={cx('item', index === 0 && 'action')}
               onClick={() => {
                  handleOptionClick(option);
                  if (handleSubmit) handleSubmit(option);
                  if (onClose) {
                     onClose();
                  }
               }}
            >
               <div className={cx('option')}>
                  <div className={cx('flex-option')}>
                     {checkbox && (
                        <input
                           type="checkbox"
                           id={option?.label}
                           className={cx('custom-input-checkbox')}
                           onChange={(event) => {
                              handleChange(event);
                              updateQueryParams();
                           }}
                           value={option.key}
                           checked={checkedTypes?.includes(option.key)}
                        />
                     )}
                     {option?.img ? (
                        <img
                           src={option?.img}
                           alt=""
                           className={cx('img-icon')}
                           style={{ '--_zb0g5d': widthImg, borderRadius: percent50 && '50%' }}
                        />
                     ) : option?.backgroundProfile ? (
                        <div
                           className={cx('bgrImg')}
                           style={{ '--_zb0g5d': widthImg, '--bgr': option?.backgroundProfile }}
                        >
                           <p className={cx('textBgr')}>{option?.textInBackgroundProfile}</p>
                        </div>
                     ) : option?.imgNone ? (
                        <img
                           src="https://avatar-management.services.atlassian.com/default/48"
                           alt=""
                           className={cx('img-icon')}
                           style={{ '--_zb0g5d': widthImg, borderRadius: percent50 && '50%' }}
                        />
                     ) : (
                        ''
                     )}
                     <span
                        className={cx(
                           status && 'text-label',
                           option.label === 'TODO' && 'text-todo',
                           option.label === 'IN PROGRESS' && 'text-in-process',
                           option.label === 'IN REVIEW' && 'text-in-process',
                           option.label === 'DONE' && 'text-done',
                        )}
                     >
                        {option?.label !== undefined ? option?.label : ''}
                     </span>
                  </div>
               </div>
            </div>
         </label>
      );
   });
   return (
      <div className={cx('main')} style={{ width: width, right: right }}>
         <div className={cx('wrapper')}>{renderOptions}</div>
      </div>
   );
}

export default ModalSelect;
