import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/contexts/auth/authContext';
import AuthService from '~/services/auth/authServices';
import Button from '~/component/Buttton/Button';

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
      <Button className={cx('login-google-button')} center onClick={() => googleLogin()}>
         <svg aria-hidden="true" viewBox="0 0 18 18" className="_1e0c1ule _1bsbf6fq _4t3if6fq">
            <path
               d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
               fill="#4285F4"
            />
            <path
               d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
               fill="#34A853"
            />
            <path
               d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
               fill="#FBBC05"
            />
            <path
               d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
               fill="#EA4335"
            />
         </svg>

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
