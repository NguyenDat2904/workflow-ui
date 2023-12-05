import React from 'react';
import { Card } from './cards/Cards';
import { ButtonFilled, ButtonLight, InputFilled, InputLight } from './Inputs/Inputs';

export default function TestComponent() {
    return (
        <div>
            <p>Cards</p>
            <Card>Card</Card>
            <p>Input</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <InputLight placeholder={'Input'} type={'text'} name={'text'} />
                <ButtonLight type={'submit'}>Button</ButtonLight>
                <InputFilled placeholder={'Input'} type={'text'} name={'text'} />
                <ButtonFilled type={'submit'}>Button</ButtonFilled>
            </div>
        </div>
    );
}
