import { createContext, useState } from 'react';
const TitleContext = createContext({
   title: 'React App',
   setTitle: () => {},
});

const TitleProvider = ({ children }) => {
   const [title, setTitle] = useState('React App');
   const updateTitle = (newTitle) => {
      setTitle(newTitle);
   };

   return <TitleContext.Provider value={{ title, setTitle: updateTitle }}>{children}</TitleContext.Provider>;
};

export { TitleProvider, TitleContext };
