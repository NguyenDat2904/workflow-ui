import { Fragment, useContext } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';
import DefaultLayout from '~/layout/DefaultLayout/DefaultLayout';

const PrivateRouter = () => {
   const { isAuthenticated } = useContext(AuthContext);
   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
   
   
};

export default PrivateRouter;
