import { createContext, useState, useEffect } from 'react';
import WorkService from '~/services/work/workServices';
import { post, patch } from '~/ultil/hpptRequest';
const UserContext = createContext();

const UserProvider = ({ children }) => {
   const accessToken = localStorage.getItem('accessToken');
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
   //
   const [loadingGetProject, setLoadingGetProject] = useState(true);

   const [pageProject, setPageProject] = useState({
      page: 0,
      total: 0,
   });

   const [detailProject, setDetailProject] = useState({});
   const [loadingDetailsProject, setLoadingDetailsProject] = useState(false);

   const workService = new WorkService();

   // Func
   const onclickSeeModalSelectImg = (number) => {
      if (modalSelectImg > 0) {
         setModalSelectImg(number);
         setImgAvatar(true);
      } else {
         setModalSelectImg(number);
         setImgAvatar(true);
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
   // GET project
   const GetListProject = async () => {
      if (accessToken) {
         setLoadingGetProject(true);
         const listProject = await post(
            `/work/project/${parseuser?._id}`,
            { deleteProject: false },
            {
               headers: {
                  authorization: `${accessToken}`,
                  refresh_token: `${parseuser?.refreshToken}`,
               },
            },
         );
         if (listProject.data.accessToken) {
            const getListAgain = await post(
               `/work/project/${parseuser?._id}`,
               { deleteProject: false },
               {
                  headers: {
                     authorization: `${listProject.data.accessToken}`,
                     refresh_token: `${parseuser?.refreshToken}`,
                  },
               },
            );
            localStorage.setItem('accessToken', listProject.data.accessToken);
            setDataProject(getListAgain.data.workProject);
            setPageProject(() => {
               setPageProject({
                  page: getListAgain.data.page,
                  total: getListAgain.data.totalPages,
               });
            });
         } else {
            setDataProject(listProject.data.workProject);
            setPageProject(() => {
               setPageProject({
                  page: listProject.data.page,
                  total: listProject.data.totalPages,
               });
            });
         }
         setLoadingGetProject(false);
      }
   };
   useEffect(() => {
      GetListProject();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (
         valueInput.jopTitle !== dataUserProfile.jopTitle ||
         valueInput.department !== dataUserProfile.department ||
         valueInput.organization !== dataUserProfile.organization ||
         valueInput.location !== dataUserProfile.location ||
         valueInput.name !== dataUserProfile.name ||
         valueInput.gender !== dataUserProfile.gender ||
         valueInput.birthDay !== dataUserProfile.birthDay ||
         valueInput.desc !== dataUserProfile.desc ||
         valueInput.email !== dataUserProfile.email ||
         valueInput.phone !== dataUserProfile.phone
      ) {
         if (namefillInput !== '') {
            const addUserInfo = await patch(
               `/users/updateUser/${dataUserProfile?._id}`,
               { nameFill: namefillInput, contenEditing: valueInputAny },
               {
                  headers: {
                     authorization: `${parseuser?.accessToken}`,
                     refresh_token: `${parseuser?.refreshToken}`,
                  },
               },
            );
            if (addUserInfo.status === 200) {
            }
         }
      }
   };
   const apiListWork = async () => {
      const popDataProject = dataProject?.length - 1;
      const user = localStorage.getItem('user');
      const parseuser = JSON.parse(user);
      const postdataListWork = await post(
         '/work/listwork',
         {
            nameProject: `${dataProject[popDataProject].nameProject}`,
         },
         {
            headers: {
               authorization: `${parseuser?.accessToken}`,
               refresh_token: `${parseuser?.refreshToken}`,
            },
         },
      );
      const positionEnd = postdataListWork.data.listWorkID?.length;
      const positionStart = postdataListWork.data.listWorkID?.length - 6;
      const dataListWork = postdataListWork.data.listWorkID?.slice(positionStart, positionEnd);

      setDataListWork(dataListWork);
   };

   useEffect(() => {
      if (dataProject?.length > 0) {
         apiListWork();
      }
   }, [dataProject]);

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
      setDataUserProfile,
      dataUserProfile,
      dataListWork,
      setDataListWork,
      dataProject,
      setDataProject,
      parseuser,
      pageProject,
      setPageProject,
      loadingGetProject,
      setLoadingGetProject,
      GetListProject,
      detailProject,
      setDetailProject,
      loadingDetailsProject,
      setLoadingDetailsProject,
      GetListProject,
   };
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
