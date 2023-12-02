import React from 'react';
import './Login.scss';
import { ButtonFilled, ButtonLight, InputLight } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { ReactComponent as GoogleIcon } from '../../asset/icons/google.svg';

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
            </Card>
        </div>
    );
}

export default Login;
