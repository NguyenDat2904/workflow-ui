import * as yup from 'yup';
const schema = yup
   .object()
   .shape({
      currentPassword: yup.string().required('Please enter a current password'),
      password: yup
         .string()
         .oneOf([yup.ref('currentPassword')], 'Password must match current password')
         .required('Please enter a password'),
   })
   .required();
export default schema;
