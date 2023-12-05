import React from 'react';
import { Card } from './cards/Cards';
import { ButtonFilled, ButtonLight, Button, InputFilled, InputLight } from './Inputs/Inputs';
import { ReactComponent as GoogleIcon } from '../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';

export default function TestComponent() {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });

    const handleButtonClick = () => {
        login(); // Call the login function here
    };

    return (
        <div>
            <p>Cards</p>
            <Card>Card</Card>
            <p>Input</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <InputLight placeholder={'Input'} type={'text'} name={'text'} />
                <ButtonLight type={'submit'} onClick={handleButtonClick}>
                    Button
                </ButtonLight>{' '}
                {/* Call handleButtonClick onClick */}
                <InputFilled placeholder={'Input'} type={'text'} name={'text'} />
                <ButtonFilled type={'submit'}>Button</ButtonFilled>
                <br />
                <Button buttonStyle="light" onClick={() => handleButtonClick()}>
                    <GoogleIcon />
                    Continue with Google
                </Button>
            </div>
        </div>
    );
}
