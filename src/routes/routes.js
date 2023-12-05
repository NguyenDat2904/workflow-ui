import BlackLog from '~/pages/BlackLog/BlackLog';
import Board from '~/pages/Board/Board';
import ChangePassword from '~/pages/ChangePassword/ChangePassword';
import Forgot from '~/pages/Forgot/Forgot';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Verify from '~/pages/Verify/Verify';

const publicRoutes = [
    {
        path: '/',
        component: BlackLog,
    },
    { path: '/board', component: Board },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/verify', component: Verify, layout: null },
    { path: '/forgot', component: Forgot, layout: null },
    { path: '/forgot/change-password', component: ChangePassword, layout: null },
];

export default publicRoutes;
