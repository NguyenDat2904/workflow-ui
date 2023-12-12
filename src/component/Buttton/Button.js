import React from 'react';
import classNames from 'classnames/bind';
import style from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Button({
    to,
    href,
    backgroundNone,
    noChildren,
    borderRadius,
    whiteBackGround,
    leftIcon,
    rightIcon,
    loading,
    className,
    small = false,
    large = false,
    outline = false,
    disable = false,
    children,
    onClick,
    type,
    ...passProps
}) {
    let Comp = 'button';
    const _props = { onClick, type, ...passProps };
    if (disable) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }
    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className]: className,
        backgroundNone,
        noChildren,
        borderRadius,
        whiteBackGround,
        disable,
        small,
        large,
    });
    return (
        <Comp className={classes} {..._props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
