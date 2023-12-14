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
        onSuccess: (codeResponse) => {
            async function sendingGoogleToken() {
                console.log(codeResponse.access_token);
                const response = await post(
                    '/users/loginGoogle',

                    {
                        headers: {
                            tokengoogle: `${codeResponse.access_token}`,
                        },
                    },
                );
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
            }
            sendingGoogleToken();
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });

    const handleLoginWithGoogle = () => {
        googleLogin();
    };
    return (
        <Button buttonStyle={'light'} className="login-google-button" onClick={() => handleLoginWithGoogle()}>
            <GoogleIcon />
            <span>Continue with Google</span>
        </Button>
    );
}
