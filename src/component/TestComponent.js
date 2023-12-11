import React from 'react';
import { Card } from './cards/Cards';
import { Button, Input } from './inputs/Inputs';
import { Article } from './articles/Articles';
import { ReactComponent as GoogleIcon } from '../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { Table } from './tables/Tables';

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
        <Article>
            <h3>Cards</h3>
            <Card>Card</Card>
            <h3>Input</h3>
            <div>
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
            <h3>Table</h3>
        </Article>
    );
}
