import React from 'react';
import classNames from 'classnames/bind';
import Input from '../Input/Input';
import AnyOne from '../anyone/anyone';
import styles from './EditField.module.scss';

const cx = classNames.bind(styles);

const EditField = ({
   type,
   name,
   label,
   placeholder,
   valueInput,
   formButton,
   handleFormButton,
   handleSubmit,
   handleOnchange,
}) => {
   return (
      <div className={cx('childrenAboutYou')}>
         <Input
            type={type}
            name={name}
            value={valueInput}
            onClick={handleFormButton}
            formButton={formButton}
            onSubmit={handleSubmit}
            onBlur={handleSubmit}
            onChange={handleOnchange}
            label={label}
            placeholder={placeholder}
         />
      </div>
   );
};
export default EditField;
