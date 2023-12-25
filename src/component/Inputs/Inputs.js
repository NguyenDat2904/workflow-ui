import React from 'react';
import './inputs.scss';

export function Input({ error, id, inputStyle, label, ...props }) {
   let className;
   switch (inputStyle) {
      case 'filled':
         className = 'input-filled';
         break;
      case 'light':
      default:
         className = 'input-light';
         break;
   }

   return (
      <div className="input-container">
         {label && <label htmlFor={id}>{label}</label>}
         <input className={`input ${className} ${error && 'input-error'}`} id={id} {...props} />
         {error && <p className="input-error-message">{error}</p>}
      </div>
   );
}

export function Button({ children, buttonStyle, className, ...props }) {
   let buttonType;
   switch (buttonStyle) {
      case 'light':
         buttonType = 'button-light';
         break;
      case 'filled':
         buttonType = 'button-filled';
         break;
      case 'disabled':
         buttonType = 'button-disabled';
         break;
      default:
         buttonType = 'button-light';
         break;
   }

   return (
      <button className={`button ${buttonType} ${className}`} {...props}>
         {children}
      </button>
   );
}

export function Form({ children, className, ...props }) {
   return (
      <form className={`form ${className}`} {...props}>
         {children}
      </form>
   );
}
