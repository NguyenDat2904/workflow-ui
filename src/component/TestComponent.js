import React from 'react';
import { Card } from './cards/Cards';
import { Button, Input } from './Inputs/Inputs';
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
                <Input inputStyle={'light'} placeholder={'Input'} type={'text'} name={'text'} />
                <Button inputStyle={'light'} type={'submit'} onClick={handleButtonClick}>
                    Button
                </Button>
                <Input inputStyle={'filled'} placeholder={'Input'} type={'text'} name={'text'} />
                <Button buttonStyle="filled" type={'submit'}>
                    Button
                </Button>
                <br />
                <Button buttonStyle="light" onClick={() => handleButtonClick()}>
                    <GoogleIcon />
                    Continue with Google
                </Button>
            </div>
        </div>
    );
}
