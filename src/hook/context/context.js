import { createContext, useState } from 'react';
const AppContext = createContext();

const AppProvider = (props) => {
    const [values, setValue] = useState({
        email: '',
        full_name: '',
        username: '',
        password: '',
        cfmPassword: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        full_name: '',
        username: '',
        password: '',
        cfmPassword: '',
    });
    const [classError, setClassError] = useState({
        email: null,
        full_name: null,
        username: null,
        loading: null,
        loadingRegister: null,
    });

    // Func

    // onChangeInput
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const value = { values, setValue, handleChange, errors, setErrors, classError, setClassError };
    return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
};

export { AppProvider, AppContext };
