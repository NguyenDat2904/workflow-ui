import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import Input from '../Input/Input';
import AnyOne from '../anyone/anyone';
import styles from './EditField.module.scss';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(styles);

const EditField = ({ type, name, label, placeholder, valueInput }) => {
    const { formButton, handleFormButton, handleSubmit, handleOnchange } = useContext(UserContext);
    return (
        <div className={cx('childrenAboutYou')}>
            <Input
                type={type}
                name={name}
                value={valueInput}
                onClick={handleFormButton}
                formButton={formButton}
                onSubmit={handleSubmit}
                onChange={handleOnchange}
                label={label}
                placeholder={placeholder}
            />
            <div className={cx('canSee')}>
                <AnyOne />
            </div>
        </div>
    );
};
export default EditField;
