import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { Input, Button, Form } from '../../component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { Divider } from '~/component/dividers/Dividers';
import { NavigationLinks } from '~/component/links/Links';
import { useGoogleLogin } from '@react-oauth/google';
import { post } from '../../ultil/hpptRequest';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            async function sendingGoogleToken() {
                const response = await post('/users/loginGoogle', {
                    tokenGoogle: codeResponse.access_token,
                });
                if (response.status === 200) {
                    navigate('/');
                } else {
                    switch (response.status) {
                        case 404:
                            setError('This email is not registered yet.');
                            break;
                        default:
                            setError('Something went wrong. Please try again later.');
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

    const handleLoginWithUsername = async (e) => {
        e.preventDefault();
        setError('');
        const response = await post('/users/login', {
            userName: username,
            passWord: password,
        });
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } else {
            switch (response.status) {
                case 404:
                    setError('Invalid email or password.');
                    break;
                default:
                    setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
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
                        id={'username'}
                        inputStyle={'light'}
                        label={'Email or username:'}
                        type={'username'}
                        name={'username'}
                        placeholder={'Enter email or username'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        id={'password'}
                        inputStyle={'light'}
                        label={'Password:'}
                        type={'password'}
                        name={'password'}
                        placeholder={'Enter password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="login-error">{error}</p>
                    <Button buttonStyle={'filled'} type={'submit'}>
                        Log in
                    </Button>
                </Form>
                <p>OR</p>
                <Button buttonStyle={'light'} onClick={() => handleLoginWithGoogle()}>
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
