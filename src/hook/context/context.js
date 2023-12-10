import { createContext, useState } from 'react';
import { post } from '~/ultil/hpptRequest';
const AppContext = createContext();

const AppProvider = (props) => {
    const [modalSelectImg, setModalSelectImg] = useState(0);
    const [imgAvatar, setImgAvatar] = useState(true);
    const [formButton, setFormButton] = useState(true);

    const [valueInput, setValueInput] = useState({
        bagIcon: '',
        treeIcon: '',
        buiding: '',
        location: '',
        inputName: '',
        inputGender: '',
        inputBirthDay: '',
        inputDesc: '',
        inputEmail: '',
        inputPhone: '',
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
        const { name, value } = e.target;
        setValueInput((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //    const addUserInfo= await post(`https://workflow-sever.onrender.com//users/updateUser/65751db0e2dd8d4d32c4e702`,{

        //    },{})
    };

    const handleFormButton = () => {
        if (formButton === true) {
            setFormButton(false);
        } else {
            setFormButton(true);
            setValueInput({
                bagIcon: '',
                treeIcon: '',
                buiding: '',
                location: '',
                inputName: '',
                inputGender: '',
                inputBirthDay: '',
                inputDesc: '',
                inputEmail: '',
                inputPhone: '',
            });
        }
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
    };
    return <AppContext.Provider value={value} {...props}></AppContext.Provider>;
};

export { AppProvider, AppContext };
