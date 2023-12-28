import { useContext, React } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';

const PublicRouter = () => {
   const { isAuthenticated } = useContext(AuthContext);
   return isAuthenticated ? <Navigate to="/project" /> : <Outlet />;
};

export default PublicRouter;
