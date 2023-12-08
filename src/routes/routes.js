import BlackLog from '~/pages/BlackLog/BlackLog';
import Board from '~/pages/Board/Board';
import ProfileSecurity from '~/pages/Profile/ProfileSecurity';
import ChangePassword from '~/pages/ChangePassword/ChangePassword';
import Forgot from '~/pages/Forgot/Forgot';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import TestComponent from '~/component/TestComponent';
import Verify from '~/pages/Verify/Verify';
import Notification from '~/pages/Notication/Notication';

const publicRoutes = [
    {
        path: '/',
        component: BlackLog,
    },
    { path: '/board', component: Board },
    { path: '/profile/security', component: ProfileSecurity },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/test', component: TestComponent, layout: null },
    { path: '/verify', component: Verify, layout: null },
    { path: '/forgot', component: Forgot, layout: null },
    { path: '/forgot/change-password', component: ChangePassword, layout: null },
    { path: '/register/verify', component: Notification, layout: null },
];

export default publicRoutes;
