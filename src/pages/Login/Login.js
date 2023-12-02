import React from 'react';
import './Login.scss';
import { ButtonFilled, InputLight } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';

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
                <ButtonFilled content={'Log in'} type={'submit'} />
                <p>OR</p>
            </Card>
        </div>
    );
}

export default Login;
