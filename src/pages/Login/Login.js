import React from 'react';
import './Login.scss';

function Login() {
    return (
        <div id="login">
            <form class="login-container">
                <h3>
                    Log in
                    <p>With your WorkFlow account</p>
                </h3>
                <input type="text" id="username" name="username" placeholder="example@email.com" />
                <input type="password" id="password" name="password" placeholder="Enter password" />
                <button type="submit">Log in</button>
                <p>OR</p>
            </form>
        </div>
    );
}

export default Login;
