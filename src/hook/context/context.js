import { createContext } from 'react';
const AppContext = createContext();

const AppProvider = (props) => {
    const value = {};
    return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
};

export { AppProvider, AppContext };
