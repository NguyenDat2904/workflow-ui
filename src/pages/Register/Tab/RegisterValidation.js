import * as yup from 'yup';
const schema = yup
   .object()
   .shape({
      email: yup
         .string()
         .matches(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.')
         .required('Please enter a valid email address.'),
      username: yup
         .string()
         .min(6, 'Username must be at 6 - 20 characters: letters and numbers.')
         .max(20, 'Username must be at 6 - 20 characters: letters and numbers.')
         .required('Username must be at 6 - 20 characters: letters and numbers.'),
      full_name: yup.string().min(1, 'Full name must be at least 1 characters').required(),
   })
   .required();
export default schema;
