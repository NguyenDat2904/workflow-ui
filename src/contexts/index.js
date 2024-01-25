import { AuthProvider } from './auth/authContext';
import { ProjectProvider } from './project/projectContext';
import { TitleProvider } from './title/TitleProvider';
import { UserProvider } from './user/userContext';

const GlobalProvider = ({ children }) => {
   return (
      <TitleProvider>
         <AuthProvider>
            <UserProvider>
               <ProjectProvider>{children}</ProjectProvider>
            </UserProvider>
         </AuthProvider>
      </TitleProvider>
   );
};

export default GlobalProvider;
