import * as yup from 'yup';
const schema = yup
   .object()
   .shape({
      name: yup
         .string()
         .min(2, 'Give your project a name (longer than 2 characters).')
         .required('Give your project a name (longer than 2 characters).'),
      key: yup
         .string()
         .min(2, 'You must specify a valid project key.')
         .required('You must specify a valid project key.'),
   })
   .required();
export default schema;
