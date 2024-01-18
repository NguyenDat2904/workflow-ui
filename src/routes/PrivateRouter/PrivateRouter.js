import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';

const PrivateRouter = () => {
   const location = useLocation();
   const { isAuthenticated } = useContext(AuthContext);
   if (isAuthenticated) {
      if (location.pathname === '/') {
         return <Navigate to="/project" replace />;
      }
      return <Outlet />;
   } else {
      return <Navigate to="/login" replace />;
   }
};

export default PrivateRouter;
