import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '~/component/Inputs/Inputs';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import './Login.module.scss';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';
import AuthService from '~/services/auth/authServices';

const authService = new AuthService();

export default function LoginGoogleButton() {
   const navigate = useNavigate();
   const { setDataUserProfile } = useContext(UserContext);
   const { setIsAuthenticated } = useContext(AuthContext);

   const googleLogin = useGoogleLogin({
      onSuccess: async (codeResponse) => {
         const response = await authService.loginGoogle(codeResponse.access_token);
         if (response?.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
            setIsAuthenticated(true);
            navigate('/project');
         } else {
            switch (response?.status) {
               case 404:
                  toast.error('Invalid email or password');
                  break;
               default:
                  toast.error('Something went wrong. Please try again later');
                  break;
            }
         }
      },
      onError: (error) => {
         console.log('Login Failed:', error);
      },
   });

   return (
      <Button buttonStyle={'light'} className="login-google-button" onClick={() => googleLogin()}>
         <GoogleIcon />
         <span>Continue with Google</span>
      </Button>
   );
}
