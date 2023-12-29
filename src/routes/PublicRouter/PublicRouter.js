import { useContext, React } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';

const PublicRouter = () => {
   const location = useLocation();
   const { isAuthenticated } = useContext(AuthContext);
   if (isAuthenticated) {
      if (location.pathname === '/') {
         return <Navigate to="/project" />;
      }
      return <Outlet />;
   } else {
      return <Outlet />;
   }

   // return isAuthenticated ? <Navigate to="/project" /> : <Outlet />;
};

export default PublicRouter;
