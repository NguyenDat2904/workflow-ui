import { createContext, useState, useEffect } from 'react';
import { get, post, patch } from '~/ultil/hpptRequest';
const AppContext = createContext();

const AppProvider = (props) => {
    const user = localStorage.getItem('user');
    const parseuser = JSON.parse(user);
    const [modalSelectImg, setModalSelectImg] = useState(0);
    const [imgAvatar, setImgAvatar] = useState(true);
    const [formButton, setFormButton] = useState(true);
    const [dataUserProfile, setDataUserProfile] = useState({});
    const [dataListWork, setDataListWork] = useState([]);
    const [dataProject, setDataProject] = useState([]);
    const [namefillInput, setNamefillInput] = useState('');
    const [valueInputAny, setValueInputAny] = useState('');
    const [valueInput, setValueInput] = useState({
        jopTitle: '',
        department: '',
        organization: '',
        location: '',
        name: '',
        gender: '',
        birthDay: '',
        desc: '',
        email: '',
        phone: '',
    });
    const onclickSeeModalSelectImg = (number) => {
        if (modalSelectImg > 0) {
            setModalSelectImg(number);
            setImgAvatar(true);
        } else {
            setModalSelectImg(number);
        }
    };

    const handleOnchange = (e) => {
        setNamefillInput(e.target.name);
        setValueInputAny(e.target.value);
        const { name, value } = e.target;
        setValueInput((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFormButton = () => {
        if (formButton === true) {
            setFormButton(false);
        } else {
            setFormButton(true);
        }
    };
    // call dataUser
    const callApi = async () => {
        const APIuser = await get(`/users/${parseuser._id}`, {
            headers: {
                authorization: `${parseuser.accessToken}`,
                refresh_token: `${parseuser.refreshToken}`,
            },
        });
        setDataUserProfile(APIuser.data);
        setValueInput({ ...APIuser.data });
        const getWorkProject = await get(`/work/project/${parseuser._id}`, {
            headers: {
                authorization: `${parseuser.accessToken}`,
                refresh_token: `${parseuser.refreshToken}`,
            },
        });
        setDataProject(getWorkProject.data);
    };
    useEffect(() => {
        callApi();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const addUserInfo = await patch(
            `/users/updateUser/${dataUserProfile._id}`,
            { nameFill: namefillInput, contenEditing: valueInputAny },
            {
                headers: {
                    authorization: `${parseuser.accessToken}`,
                    refresh_token: `${parseuser.refreshToken}`,
                },
            },
        );
        if (addUserInfo.status === 200) {
            callApi();
        }
    };
    const apiListWork = async () => {
        const popDataProject = dataProject.length - 1;
        const user = localStorage.getItem('user');
        const parseuser = JSON.parse(user);
        const postdataListWork = await post(
            '/work/listwork',
            {
                nameProject: `${dataProject[popDataProject].nameProject}`,
            },
            {
                headers: {
                    authorization: `${parseuser.accessToken}`,
                    refresh_token: `${parseuser.refreshToken}`,
                },
            },
        );
        setDataListWork(postdataListWork.data);
    };

    useEffect(() => {
        if (dataProject.length > 0) {
            apiListWork();
        }
    }, [dataProject]);

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
    const value = {
        formButton,
        valueInput,
        handleFormButton,
        handleSubmit,
        handleOnchange,
        onclickSeeModalSelectImg,
        modalSelectImg,
        imgAvatar,
        setImgAvatar,
        values,
        setValue,
        handleChange,
        errors,
        setErrors,
        classError,
        setClassError,
        setDataUserProfile,
        dataUserProfile,
        dataListWork,
        setDataListWork,
        dataProject,
        callApi,
    };
    return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
};

export { AppProvider, AppContext };
