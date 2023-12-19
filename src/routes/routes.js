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
import Reset from '~/pages/Notication/Reset';
import ViewAllListWork from '~/pages/Profile/viewAllListWork/viewAllListWork';
import HeaderOnly from '~/layout/HeaderOnly/HeaderOnly';
import CreateProject from '~/pages/Projects/Create/CreateProject';
import TrashProjects from '~/pages/Projects/Trash/TrashProjects';
import ProjectAccess from '~/pages/Projects/Access/ProjectAccess';

const privateRoutes = [
   {
      path: '/',
      component: BlackLog,
   },
   { path: '/board', component: Board },
   { path: '/profile/security', component: ProfileSecurity, layout: null },
   { path: '/profile', component: Profile, layout: HeaderOnly },
   { path: '/profile/profile-and-visibility', component: ProfileAndVisibility, layout: null },
   { path: '/profile/view-all-list-work', component: ViewAllListWork, layout: HeaderOnly },
   { path: '/test', component: TestComponent, layout: null },
   { path: '/forgot/change-password', component: ChangePassword, layout: null },
   { path: '/project', component: Projects, layout: HeaderOnly },
   { path: '/project/create', component: CreateProject, layout: null },
   { path: '/project/trash', component: TrashProjects, layout: HeaderOnly },
   { path: '/project/settings/access', component: ProjectAccess, layout: HeaderOnly },
];

const publicRoutes = [
   { path: '/verify', component: Verify, layout: null },
   { path: '/forgot', component: Forgot, layout: null },
   { path: '/reset-password', component: Reset, layout: null },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Register, layout: null },
   { path: '/register/verify', component: Notification, layout: null },
];

export { privateRoutes, publicRoutes };
