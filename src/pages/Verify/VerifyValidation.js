import * as yup from 'yup';
const schema = yup.object().shape({
   password: yup
      .string()
      .min(6, 'Passwords must be at least 6 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one letter and one number')
      .required('Please enter a password'),
   cfmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password does not match')
      .required('Please confirm your password'),
});
export default schema;
