import React from 'react';
import Button from '~/component/Buttton/Button';
import { MenuIcon } from '~/component/icon/icon';

function Login() {
    return <Button leftIcon={<MenuIcon />} noChildren={true} backgroundNone={true} borderRadius={true}></Button>;
}

export default Login;
