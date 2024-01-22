import { createContext, useState } from 'react';
const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
   const [detailProject, setDetailProject] = useState({});
   const [members, setMembers] = useState([]);

   const value = {
      detailProject,
      setDetailProject,
      members,
      setMembers,
   };
   return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider, ProjectContext };
