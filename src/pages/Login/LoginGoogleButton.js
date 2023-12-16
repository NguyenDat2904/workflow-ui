import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '~/component/Inputs/Inputs';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { post } from '../../ultil/hpptRequest';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

export default function LoginGoogleButton() {
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            const response = await post('/users/loginGoogle', {
                tokenGoogle: codeResponse.access_token,
            });
            if (response.status === 200) {
                navigate('/');
            } else {
                switch (response.status) {
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
