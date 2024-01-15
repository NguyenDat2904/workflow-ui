import * as yup from 'yup';
const schema = yup
   .object()
   .shape({
      userName: yup
         .string()

         .required('Please enter a username'),
      passWord: yup.string().required('Please enter a password'),
   })
   .required();
export default schema;
