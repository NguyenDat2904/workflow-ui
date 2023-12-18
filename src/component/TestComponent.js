import React from 'react';
import { Card } from './cards/Cards';
import { Button, Input } from './Inputs/Inputs';
import { Article } from './articles/Articles';
import { ReactComponent as GoogleIcon } from '../asset/icons/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { Table } from './tables/Tables';
import Dropdown from './dropdown/Dropdown';

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
            <Button inputStyle={'light'}>Button</Button>
            <Input inputStyle={'filled'} placeholder={'Input'} type={'text'} name={'text'} />
            <Button buttonStyle="filled">Button</Button>
            <br />
            <Button buttonStyle="light" onClick={() => handleButtonClick()}>
               <GoogleIcon />
               Continue with Google
            </Button>
         </div>
         <h3>Dropdown</h3>
         <Dropdown
            actions={[
               { label: 'Edit', method: () => {} },
               { label: 'Delete', method: () => {} },
            ]}
         >
            Custom Dropdown
         </Dropdown>
         <h3>Table</h3>
         <Table
            actions={[
               { label: 'Edit', method: () => {} },
               { label: 'Delete', method: () => {} },
            ]}
            colWidthRatio={[10, 80]}
            data={[
               { id: 1, name: 'John' },
               { id: 2, name: 'Jane' },
               { id: 3, name: 'Bob' },
            ]}
         />
      </Article>
   );
}
