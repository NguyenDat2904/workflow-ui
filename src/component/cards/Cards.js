import React from 'react';
import './cards.scss';

const Card = React.forwardRef(({ children, className }, ref) => (
   <div ref={ref} className={`card ${className}`}>
      {children}
   </div>
));

export { Card };
