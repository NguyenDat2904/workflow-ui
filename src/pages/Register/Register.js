import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { post } from '~/ultil/hpptRequest';
import { LoadingIcon } from '~/component/icon/icon';
import { AppContext } from '~/hook/context/context';
import HomeLayout from '~/layout/HomeLayout/HomeLayout';
import LoginGoogleButton from '../Login/LoginGoogleButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './Tab/RegisterValidation';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
const cx = classNames.bind(style);

function Register() {
   const navigate = useNavigate();
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const { email } = params;

   const form = useForm({
      defaultValues: {
         email: '',
         full_name: '',
         username: '',
      },
      resolver: yupResolver(schema),
   });

   // 0. Context
   const { values, setValue, errors, setErrors, classError, setClassError } = useContext(AppContext);
   // 1. State
   const [toggleForm, setToggleForm] = useState(true);

   // 2. UseEffect
   useEffect(() => {
      if (email) {
         form.setValue('email', email);
         setToggleForm(false);
      }
   }, [email]);
   useEffect(() => {
      const emailRegex = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const userRegex = /^$|(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
      const isValidUser = userRegex.test(values.username);
      const isValidEmail = emailRegex.test(values.email);
      let hashErrorEmail;
      let hashErrorUser;
      const newErrors = {};

      // Validate Email
      if (!isValidEmail) {
         newErrors.email = 'Please enter a valid email address.';
         setClassError((pre) => ({
            ...pre,
            email: false,
         }));
         hashErrorEmail = true;
      } else {
         if (values.email === '') {
            hashErrorEmail = null;
         } else {
            hashErrorEmail = false;
         }
      }
      if (hashErrorEmail === false) {
         setClassError((pre) => ({
            ...pre,
            email: true,
         }));
      }

      if (hashErrorEmail === null) {
         setClassError((pre) => ({
            ...pre,
            email: null,
         }));
      }

      // Validate full name
      if (values.full_name !== '') {
         setClassError((pre) => ({
            ...pre,
            full_name: true,
         }));
      } else {
         setClassError((pre) => ({
            ...pre,
            full_name: null,
         }));
      }

      // Validate username
      if (!isValidUser) {
         newErrors.username = 'Username must be at 6 - 20 characters: letters and numbers.';
         setClassError((pre) => ({
            ...pre,
            username: false,
         }));
         hashErrorUser = true;
      } else {
         if (values.username === '') {
            hashErrorUser = null;
         } else {
            hashErrorUser = false;
         }
      }

      if (hashErrorUser === false) {
         setClassError((pre) => ({
            ...pre,
            username: true,
         }));
      }

      if (hashErrorUser === null) {
         setClassError((pre) => ({
            ...pre,
            username: null,
         }));
      }

      setErrors(newErrors);
   }, [values]);

   // 3. Func
   const shouldDisable =
      classError.email === null ||
      classError.email === false ||
      classError.username === null ||
      classError.username === false ||
      classError.full_name === null ||
      classError.full_name === false ||
      classError.loading === true;

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (shouldDisable) {
         return;
      }
      if (classError.email && classError.full_name && classError.username) {
         setClassError((pre) => ({
            ...pre,
            loading: true,
         }));
         const verifyEmail = await post('/auth/verify', {
            email: values.email,
            userName: values.username,
            fullName: values.full_name,
         });
         if (verifyEmail.status === 200) {
            navigate(`/register/verify?email=${values.email}`);
         }
         if (verifyEmail.status === 400) {
            if (verifyEmail.data.errEmail) {
               setErrors((prev) => ({
                  ...prev,
                  email: 'The Email was registered',
               }));
               setClassError((pre) => ({
                  ...pre,
                  email: false,
                  loading: false,
               }));
            }

            if (verifyEmail.data.errUserName) {
               setErrors((prev) => ({
                  ...prev,
                  username: 'The Username was registered',
               }));
               setClassError((pre) => ({
                  ...pre,
                  username: false,
                  loading: false,
               }));
            }
         }
      }
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
                                       <div className="form-input error">
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
                              {classError.email && (
                                 <div className={cx('input-icon')}>
                                    <span>
                                       <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                          <g fill="currentColor" fillRule="evenodd">
                                             <path
                                                d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                                                fillRule="nonzero"
                                             ></path>
                                             <path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"></path>
                                          </g>
                                       </svg>
                                    </span>
                                 </div>
                              )}

                              {errors.email && (
                                 <div className={cx('errorMessage')}>
                                    <span>{errors.email}</span>
                                 </div>
                              )}

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
                                       <div className="form-input error">
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
                                       <div className="form-input error">
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
                              <button className={cx('submit', shouldDisable && 'disable')} type="submit">
                                 {!classError.loading ? <span>Agree</span> : <LoadingIcon />}
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
