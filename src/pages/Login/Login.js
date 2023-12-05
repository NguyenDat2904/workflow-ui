import React from 'react';
import './Login.scss';
import { InputLight, Button } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { Divider } from '~/component/dividers/Dividers';
import { NavigationLinks } from '~/component/links/Links';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });

    const handleGoogleLogin = () => {
        login(); // Call the login function here
    };
    return (
        <div id="login">
            <Card className="login-container">
                <h3>
                    Log in
                    <p>With your WorkFlow account</p>
                </h3>
                <InputLight type={'email'} name={'email'} placeholder={'Enter email'} />
                <InputLight type={'password'} name={'password'} placeholder={'Enter password'} />
                <Button buttonStyle={'filled'} type={'submit'}>
                    Log in
                </Button>
                <p>OR</p>
                <Button buttonStyle={'light'} onClick={() => handleGoogleLogin()}>
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </Button>
                <Divider />
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <NavigationLinks navLink="/forgot">Forgot password?</NavigationLinks>|
                    <NavigationLinks navLink="/register">Sign up for an account</NavigationLinks>
                </div>
            </Card>
        </div>
    );
}

export default Login;
