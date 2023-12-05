import React from 'react';
import './Login.scss';
import { ButtonFilled, ButtonLight, InputLight } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';
import { Divider } from '~/component/dividers/Dividers';
import { NavigationLinks } from '~/component/links/Links';

function Login() {
    return (
        <div id="login">
            <Card className="login-container">
                <h3>
                    Log in
                    <p>With your WorkFlow account</p>
                </h3>
                <InputLight type={'email'} name={'email'} placeholder={'Enter email'} />
                <InputLight type={'password'} name={'password'} placeholder={'Enter password'} />
                <ButtonFilled type={'submit'}>Log in</ButtonFilled>
                <p>OR</p>
                <ButtonLight type={'submit'}>
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </ButtonLight>
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
