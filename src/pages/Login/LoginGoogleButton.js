import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '~/component/Inputs/Inputs';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/contexts/auth/authContext';
import AuthService from '~/services/auth/authServices';

const authService = new AuthService();

const cx = classNames.bind(style);

export default function LoginGoogleButton() {
   const navigate = useNavigate();
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
      <Button buttonStyle={'light'} className={cx('login-google-button')} onClick={() => googleLogin()}>
         <GoogleIcon />
         <span
            style={{
               marginLeft: '8px',
               fontSize: '16px',
               fontWeight: '500',
               color: 'rgb(66, 82, 110)',
               fontFamily:
                  '"Charlie Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif',
            }}
         >
            Continue with Google
         </span>
      </Button>
   );
}
