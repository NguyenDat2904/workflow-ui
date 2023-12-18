import React from 'react';
import './inputs.scss';

export function Input({ id, inputStyle, label, name, onChange, placeholder, type }) {
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
         <input className={className} id={id} name={name} onChange={onChange} placeholder={placeholder} type={type} />
      </div>
   );
}

export function Button({ children, buttonStyle, className, disabled, onClick, type }) {
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
      <button className={`button ${buttonType} ${className}`} disabled={disabled} type={type} onClick={onClick}>
         {children}
      </button>
   );
}

export function Form({ children, className, onSubmit }) {
   return (
      <form className={`form ${className}`} onSubmit={onSubmit}>
         {children}
      </form>
   );
}
