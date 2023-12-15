import BlackLog from '~/pages/BlackLog/BlackLog';
import Board from '~/pages/Board/Board';
import ProfileSecurity from '~/pages/Profile/ProfileSecurity';
import ChangePassword from '~/pages/ChangePassword/ChangePassword';
import Forgot from '~/pages/Forgot/Forgot';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Profile from '~/pages/Profile/profile';
import TestComponent from '~/component/TestComponent';
import Verify from '~/pages/Verify/Verify';
import ProfileAndVisibility from '~/pages/ProfileAndVisibility/ProfileAndVisibility';
import Notification from '~/pages/Notication/Notication';
import Projects from '~/pages/Projects/Projects';
import Header from '~/layout/Header/Header';
import Reset from '~/pages/Notication/Reset';
import ViewAllListWork from '~/pages/Profile/viewAllListWork/viewAllListWork';
import DefaultLayout from '~/layout/DefaultLayout/DefaultLayout';
import CreateProject from '~/pages/Projects/Create/CreateProject';

const publicRoutes = [
    { path: '/register', component: Register, layout: null },
    {
        path: '/',
        component: BlackLog,
        layout: DefaultLayout,
    },
    { path: '/board', component: Board, layout: DefaultLayout },
    { path: '/profile/security', component: ProfileSecurity },
    { path: '/login', component: Login, layout: null },
    { path: '/profile', component: Profile, layout: DefaultLayout },
    { path: '/profile/profile-and-visibility', component: ProfileAndVisibility, layout: DefaultLayout },
    { path: '/profile/view-all-list-work', component: ViewAllListWork, layout: DefaultLayout },
    { path: '/test', component: TestComponent, layout: null },
    { path: '/verify', component: Verify, layout: null },
    { path: '/forgot', component: Forgot, layout: null },
    { path: '/reset-password', component: Reset, layout: null },
    { path: '/forgot/change-password', component: ChangePassword, layout: null },
    { path: '/register/verify', component: Notification, layout: null },
    { path: '/project', component: Projects, layout: Header },
    { path: '/project/create', component: CreateProject },
];

export default publicRoutes;
