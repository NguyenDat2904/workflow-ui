import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import Input from '../Input/Input';
import { AppContext } from '~/hook/context/context';
import AnyOne from '../anyone/anyone';
import styles from './EditField.module.scss';
const cx = classNames.bind(styles);

const EditField = ({ name, label, placeholder, valueInput }) => {
    const { formButton, handleFormButton, handleSubmit, handleOnchange } = useContext(AppContext);
    return (
        <div className={cx('childrenAboutYou')}>
            <Input
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
