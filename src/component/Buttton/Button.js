import React from 'react';
import classNames from 'classnames/bind';
import style from './Button.module.scss';
import { NavLink } from 'react-router-dom';
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
   blue,
   success,
   className,
   viewAll,
   noHover,
   tdIcon,
   disable,
   small = false,
   large = false,
   outline = false,
   children,
   onClick,
   warning,
   type,
   ...passProps
}) {
   let Comp = 'button';
   const _props = { onClick, type, ...passProps };

   if (to) {
      _props.to = to;
      Comp = NavLink;
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
      viewAll,
      blue,
      success,
      warning,
      small,
      large,
      noHover,
      tdIcon,
      disable,
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
