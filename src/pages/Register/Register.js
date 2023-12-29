import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingIcon } from '~/component/icon/icon';
import HomeLayout from '~/layout/HomeLayout/HomeLayout';
import LoginGoogleButton from '../Login/LoginGoogleButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './Tab/RegisterValidation';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import AuthService from '~/services/auth/authServices';
const cx = classNames.bind(style);

function Register() {
   const navigate = useNavigate();
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const { email } = params;
   const authService = new AuthService();
   const form = useForm({
      mode: 'all',
      defaultValues: {
         email: '',
         full_name: '',
         username: '',
      },
      resolver: yupResolver(schema),
   });
   // 0. Context
   // 1. State
   const [toggleForm, setToggleForm] = useState(true);
   const [loading, setLoading] = useState(false);
   // 2. UseEffect
   useEffect(() => {
      if (email) {
         form.setValue('email', email);
         setToggleForm(false);
      }
   }, [email]);

   // 3. Func
   const handleSubmit = async (data) => {
      setLoading(true);
      const verify = await authService.verifyRegister(data.email, data.username, data.full_name);
      if (verify?.status === 200) {
         navigate(`/register/verify?email=${data.email}`);
      }
      if (verify.status === 400) {
         if (verify.data.errEmail) {
            form.setError('email', {
               type: 'manual',
               message: 'The Email was registered',
            });
         }
         if (verify.data.errUserName) {
            form.setError('username', {
               type: 'manual',
               message: 'The Username was registered',
            });
         }
      }
      setLoading(false);
   };

   // 4. Render
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
                        <div className={cx('login-google-button-container')}>
                           <LoginGoogleButton />
                        </div>
                        <div className={cx('or')}>
                           <div className={cx('left')}></div>
                           <span>OR</span>
                           <div className={cx('right')}></div>
                        </div>
                        {toggleForm ? (
                           <div className={cx('signup-email')} onClick={() => setToggleForm(false)}>
                              <span>Sign up with email</span>
                           </div>
                        ) : (
                           <form action="" className={cx('form-submit')} onSubmit={form.handleSubmit(handleSubmit)}>
                              <div style={{ marginBottom: '20px' }}>
                                 <ControllerForm
                                    form={form}
                                    name="email"
                                    label="Work email"
                                    required
                                    labelLarge
                                    className="search"
                                    id="email-field-input"
                                 >
                                    <div className={cx('form')}>
                                       <div className="form-input error success">
                                          <input
                                             type="text"
                                             name="email"
                                             id="email-field-input"
                                             className="input"
                                             defaultValue={form.getValues('email')}
                                          />
                                       </div>
                                    </div>
                                 </ControllerForm>
                              </div>
                              <div style={{ marginBottom: '20px' }}>
                                 <ControllerForm
                                    form={form}
                                    name="full_name"
                                    label="Full name"
                                    required
                                    labelLarge
                                    className="search"
                                    id="full-name-field"
                                 >
                                    <div className={cx('form')}>
                                       <div className="form-input error success">
                                          <input
                                             type="text"
                                             name="full_name"
                                             id="full-name-field"
                                             className="input"
                                             defaultValue={form.getValues('full_name')}
                                          />
                                       </div>
                                    </div>
                                 </ControllerForm>
                              </div>
                              <div style={{ marginBottom: '20px' }}>
                                 <ControllerForm
                                    form={form}
                                    name="username"
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
                                             name="username"
                                             id="username-field"
                                             className="input"
                                             defaultValue={form.getValues('username')}
                                          />
                                       </div>
                                    </div>
                                 </ControllerForm>
                              </div>
                              <div className={cx('rules')}>
                                 <span>
                                    <p>
                                       By clicking below, you agree to the Atlassian
                                       <Link target="blank">Cloud Terms of Service </Link>
                                       and
                                       <Link target="blank"> Privacy Policy</Link>
                                    </p>
                                 </span>
                              </div>
                              <button className={cx('submit', !form.formState.isValid && 'disable')} type="submit">
                                 {!loading ? <span>Agree</span> : <LoadingIcon />}
                              </button>
                              <div className={cx('card')}>NO CREDIT CARD REQUIRED</div>
                              <div>
                                 <div className={cx('capcha')}>
                                    <span>
                                       This site is protected by reCAPTCHA and the Google <Link>Privacy Policy</Link>{' '}
                                       and <Link>Terms of Service</Link> apply.
                                    </span>
                                 </div>
                              </div>
                           </form>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </HomeLayout>
   );
}

export default Register;
