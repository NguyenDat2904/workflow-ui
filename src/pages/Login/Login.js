import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { Input, Button, Form } from '../../component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { Divider } from '~/component/dividers/Dividers';
import { NavigationLinks } from '../../component/links/Links';
import { post } from '../../ultil/hpptRequest';
import HomeLayout from '~/layout/HomeLayout/HomeLayout';
import LoginGoogleButton from './LoginGoogleButton';
import { AppContext } from '~/hook/context/context';
import { toast } from 'react-toastify';

function Login() {
   const { setIsAuthenticated, setDataUserProfile } = useContext(AppContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [usernameError, setUsernameError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const navigate = useNavigate();

   const handleLoginWithUsername = async (e) => {
      e.preventDefault();

      setUsernameError('');
      setPasswordError('');
      if (!username || !password) {
         if (!username) {
            setUsernameError('Please enter your username');
         }
         if (!password) {
            setPasswordError('Please enter your password');
         }
         return;
      }

      const response = await post('/users/login', {
         userName: username,
         passWord: password,
      });
      if (response.status === 200) {
         console.log(response.data);
         localStorage.setItem('user', JSON.stringify(response.data));
         localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
         setDataUserProfile(response.data);
         setIsAuthenticated(true);
         navigate('/');
      } else {
         switch (response.status) {
            case 404:
               toast.error('Invalid username or password.');
               break;
            default:
               toast.error('Something went wrong. Please try again later.');
         }
      }
   };

   return (
      <HomeLayout>
         <div id="login">
            <Card className="login-container">
               <h3>
                  Log in
                  <p>With your WorkFlow account</p>
               </h3>
               <Form
                  onSubmit={(e) => {
                     handleLoginWithUsername(e);
                  }}
               >
                  <Input
                     error={usernameError}
                     id={'username'}
                     inputStyle={'light'}
                     label={'Username:'}
                     type={'username'}
                     name={'username'}
                     placeholder={'Enter username'}
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                     error={passwordError}
                     id={'password'}
                     inputStyle={'light'}
                     label={'Password:'}
                     type={'password'}
                     name={'password'}
                     placeholder={'Enter password'}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                     buttonStyle={username && password ? 'filled' : 'disabled'}
                     type={'submit'}
                     disabled={!username || !password}
                  >
                     Log in
                  </Button>
               </Form>
               <p>OR</p>
               <LoginGoogleButton />
               <Divider />
               <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <NavigationLinks navLink="/forgot">Forgot password?</NavigationLinks>|
                  <NavigationLinks navLink="/register">Sign up for an account</NavigationLinks>
               </div>
            </Card>
         </div>
      </HomeLayout>
   );
}

export default Login;
