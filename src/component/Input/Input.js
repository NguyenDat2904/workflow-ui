import React from 'react';
import classNames from 'classnames/bind';
import style from './Input.module.scss';
const cx = classNames.bind(style);

function Input({ className, inputClass, type, id, placeholder, value, name, onClick, label, ...passProps }) {
    const classes = cx('input', {
        [className]: className,
        inputClass,
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('field-wrapper')}>
                <div className={cx('form-wrapper')}>
                    <label htmlFor={id}>
                        <span>{label}</span>
                    </label>
                    <div className={cx('field-edit')}>
                        <div>
                            <form className={cx('form')}>
                                <div className={cx('form-input')}>
                                    <input
                                        className={classes}
                                        type={type}
                                        {...passProps}
                                        placeholder={placeholder}
                                        id={id}
                                        value={value}
                                        name={name}
                                        onClick={onClick}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Input;
