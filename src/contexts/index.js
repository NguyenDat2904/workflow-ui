import { AuthProvider } from './auth/authContext';
import { UserProvider } from './user/userContext';

const GlobalProvider = ({ children }) => {
   return (
      <AuthProvider>
         <UserProvider>{children}</UserProvider>
      </AuthProvider>
   );
};

export default GlobalProvider;
