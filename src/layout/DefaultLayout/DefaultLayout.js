import React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '~/ultil/hpptRequest';
// import Header from '../Header/Header';
// import SideBar from '../SideBar/SideBar';

function DefaultLayout({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }
    return <div>{children}</div>;
}

export default DefaultLayout;
