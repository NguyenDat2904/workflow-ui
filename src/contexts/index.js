import { AuthProvider } from './auth/authContext';
import { ProjectProvider } from './project/projectContext';
import { UserProvider } from './user/userContext';

const GlobalProvider = ({ children }) => {
   return (
      <AuthProvider>
         <UserProvider>
            <ProjectProvider>{children}</ProjectProvider>
         </UserProvider>
      </AuthProvider>
   );
};

export default GlobalProvider;
