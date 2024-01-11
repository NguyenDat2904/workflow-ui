import React from 'react';
import Header from '../Header/Header';

function HeaderOnly({ children }) {
   return (
      <div>
         <Header />
         <div className="container">
            <div className="content" style={{ paddingTop: '56px' }}>
               {children}
            </div>
         </div>
      </div>
   );
}

export default HeaderOnly;
