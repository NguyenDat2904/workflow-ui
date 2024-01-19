import { createContext, useState } from 'react';
import UserService from '~/services/user/userServices';
const UserContext = createContext();

const UserProvider = ({ children }) => {
const userServices = new UserService();

   const user = localStorage.getItem('user');
   const parseuser = JSON.parse(user);
   const [dataUserProfile, setDataUserProfile] = useState({});
   const [loadingGetProject, setLoadingGetProject] = useState(true);

   const [loadingDetailsProject, setLoadingDetailsProject] = useState(false);
      const getUser = async () => {
         const users = await userServices.getUserProfile();
         if (users.status === 200) {
            setDataUserProfile(users.data);
         }
      };

   const value = {
      setDataUserProfile,
      dataUserProfile,
      parseuser,
      loadingGetProject,
      setLoadingGetProject,
      loadingDetailsProject,
      setLoadingDetailsProject,
      getUser,
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
