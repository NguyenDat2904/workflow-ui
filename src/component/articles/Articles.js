import React from 'react';
import './articles.scss';

export function Article({ children, className, ...props }) {
   return (
      <article className={`article ${className}`} {...props}>
         {children}
      </article>
   );
}
