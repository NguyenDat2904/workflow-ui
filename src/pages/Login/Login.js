import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeLayout from '~/layout/HomeLayout/HomeLayout';
import LoginGoogleButton from './LoginGoogleButton';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';
import AuthService from '~/services/auth/authServices';
import { useForm } from 'react-hook-form';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { LoadingIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from '../Register/Register.module.scss';
import schema from './LoginValidation';
import { yupResolver } from '@hookform/resolvers/yup';

const cx = classNames.bind(style);

function Login() {
   const authService = new AuthService();
   const form = useForm({
      mode: 'all',
      defaultValues: {
         userName: '',
         passWord: '',
      },
      resolver: yupResolver(schema),
   });
   const { setDataUserProfile } = useContext(UserContext);
   const { setIsAuthenticated } = useContext(AuthContext);

   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleLoginWithUsername = async (dataForm) => {
      if (loading) {
         return;
      }
      setLoading(true);
      const response = await authService.login(dataForm);
      if (response?.status === 200) {
         localStorage.setItem('user', JSON.stringify(response.data));
         localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
         setDataUserProfile(response.data);
         setIsAuthenticated(true);
         navigate('/project');
      } else {
         if (response.data.message === 'Email does not exist') {
            form.setError('userName', {
               type: 'manual',
               message: 'User name does not exist',
            });
         }
         if (response.data.message === 'Wrong password') {
            form.setError('passWord', {
               type: 'manual',
               message: 'Password does not exist',
            });
         }
      }
      setLoading(false);
   };

   return (
      <HomeLayout>
         <div className={cx('column', 'column-right')}>
            <div className={cx('layout-standalone')}>
               <div className={cx('css-form')}>
                  <div className={cx('css-header')}>
                     <p className={cx('css-title')}>
                        <span>Get started</span>
                     </p>
                     <p className={cx('css-text')}>
                        <span>Free for up to 10 users</span>
                     </p>
                  </div>
                  <div className={cx('css-option')}>
                     <div className={cx('option-button')}>
                        <form
                           action=""
                           className={cx('form-submit')}
                           onSubmit={form.handleSubmit(handleLoginWithUsername)}
                        >
                           <div style={{ marginBottom: '20px' }}>
                              <ControllerForm
                                 form={form}
                                 name="userName"
                                 label="Username"
                                 required
                                 labelLarge
                                 className="search "
                                 id="username-field"
                              >
                                 <div className={cx('form')}>
                                    <div className="form-input error success">
                                       <input
                                          type="text"
                                          name="userName"
                                          id="username-field"
                                          className="input"
                                          defaultValue={form.getValues('userName')}
                                       />
                                    </div>
                                 </div>
                              </ControllerForm>
                           </div>
                           <div style={{ marginBottom: '20px' }}>
                              <ControllerForm
                                 form={form}
                                 name="passWord"
                                 label="Password"
                                 required
                                 labelLarge
                                 className="search"
                                 id="full-name-field"
                              >
                                 <div className={cx('form')}>
                                    <div className="form-input error success">
                                       <input
                                          type="password"
                                          name="passWord"
                                          id="full-name-field"
                                          className="input"
                                          defaultValue={form.getValues('passWord')}
                                       />
                                    </div>
                                 </div>
                              </ControllerForm>
                           </div>
                           <button className={cx('submit', !form.formState.isValid && 'disable')} type="submit">
                              {!loading ? <span>Login</span> : <LoadingIcon />}
                           </button>
                        </form>
                        <div className={cx('or')} style={{ marginTop: '20px' }}>
                           <div className={cx('left')}></div>
                           <span>OR</span>
                           <div className={cx('right')}></div>
                        </div>
                        <div style={{ width: '100%' }}>
                           <LoginGoogleButton />
                        </div>
                        <div style={{ width: '100%', padding: '1rem 0 0 0', textAlign: 'center' }}>
                           Don't have an account?{' '}
                           <Link style={{ color: 'blue', textDecoration: 'underline' }} to="/register">
                              Register
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </HomeLayout>
   );
}

export default Login;
