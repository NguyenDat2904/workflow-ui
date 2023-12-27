import { Fragment, useContext, React } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/authContext';
import DefaultLayout from '~/layout/DefaultLayout/DefaultLayout';

const PublicRouter = () => {
   const { isAuthenticated } = useContext(AuthContext);
   return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
