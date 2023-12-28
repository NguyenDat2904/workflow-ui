import { useContext } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';

const PrivateRouter = () => {
   const { isAuthenticated } = useContext(AuthContext);
   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
