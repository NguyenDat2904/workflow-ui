import BlackLog from '~/pages/BlackLog/BlackLog';
import Board from '~/pages/Board/Board';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import TestComponent from '~/component/TestComponent';
import Verify from '~/pages/Verify/Verify';

const publicRoutes = [
    {
        path: '/',
        component: BlackLog,
    },
    { path: '/board', component: Board },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/test', component: TestComponent, layout: null },
    { path: '/verify', component: Verify, layout: null },
];

export default publicRoutes;
