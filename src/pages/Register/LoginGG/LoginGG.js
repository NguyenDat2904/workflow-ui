import React from 'react';
import './CustomGoogleLogin.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginGG({ ref }) {
    return (
        <GoogleOAuthProvider clientId="927156751612-1uvnfve8d0oo0l9ekmoeenf09ji6llub.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                className="custom-google-login"
            >
                Login
            </GoogleLogin>
        </GoogleOAuthProvider>
    );
}

export default LoginGG;
