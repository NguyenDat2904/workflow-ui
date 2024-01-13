import { createContext, useState } from 'react';
const UserContext = createContext();

const UserProvider = ({ children }) => {
   const user = localStorage.getItem('user');
   const parseuser = JSON.parse(user);
   const [dataUserProfile, setDataUserProfile] = useState({});
   const [loadingGetProject, setLoadingGetProject] = useState(true);

   const [loadingDetailsProject, setLoadingDetailsProject] = useState(false);

   const value = {
      setDataUserProfile,
      dataUserProfile,
      parseuser,
      loadingGetProject,
      setLoadingGetProject,
      loadingDetailsProject,
      setLoadingDetailsProject,
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
