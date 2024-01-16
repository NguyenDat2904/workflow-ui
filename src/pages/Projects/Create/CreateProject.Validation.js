import * as yup from 'yup';
const schema = yup
   .object()
   .shape({
      nameProject: yup.string().required('Please enter a project name'),
      codeProject: yup.string().min(3, 'Key has at least 3 characters').required('Please enter a key name'),
   })
   .required();
export default schema;
