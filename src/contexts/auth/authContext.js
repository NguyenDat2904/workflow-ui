import { createContext, useEffect, useState } from 'react';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const accessToken = localStorage.getItem('accessToken');
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const accessToken = localStorage.getItem('accessToken');
      return !!accessToken;
   });

   useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
 }, []);

   const value = {
      isAuthenticated,
      setIsAuthenticated,
      accessToken,
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
