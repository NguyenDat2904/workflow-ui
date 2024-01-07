import { createContext, useState } from 'react';
const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
   const [detailProject, setDetailProject] = useState({});

   const value = {
      detailProject,
      setDetailProject,
   };
   return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider, ProjectContext };
