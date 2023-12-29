import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Verify.module.scss';
import { EyeIconPassword, EyeIconText, LoadingIcon } from '~/component/icon/icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderSuffix from '~/component/HeaderSuffix/HeaderSuffix';
import { useForm } from 'react-hook-form';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './VerifyValidation';
import AuthService from '~/services/auth/authServices';
import { UserContext } from '~/contexts/user/userContext';
import { AuthContext } from '~/contexts/auth/authContext';

const cx = classNames.bind(style);

function Verify() {
   const { setDataUserProfile } = useContext(UserContext);
   const { setIsAuthenticated } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const { token, fullName, email, username } = params;
   const authService = new AuthService();
   const form = useForm({
      mode: 'all',
      defaultValues: {
         password: '',
         cfmPassword: '',
      },
      resolver: yupResolver(schema),
   });

   // 1. State
   const [eye, setEye] = useState({
      password: false,
      cfmPassword: false,
   });
   const [loading, setLoading] = useState(false);
   // 3. Func
   const handleSeePassword = (name) => {
      setEye((pre) => ({
         ...pre,
         [name]: !eye[name],
      }));
   };
   const handleSubmit = async (data) => {
      setLoading(true);
      const register = await authService.register(email, fullName, username, data.password, token);
      if (register.status === 200) {
         localStorage.setItem('user', JSON.stringify(register.data));
         localStorage.setItem('accessToken', JSON.stringify(register.data.accessToken));
         setDataUserProfile(register.data);
         setIsAuthenticated(true);
         navigate('/project');
      }
      setLoading(false);
   };
   return (
      <div className={cx('wrapper')}>
         <div className={cx('main')}>
            <HeaderSuffix title="Đã xác minh địa chỉ email" icon />
            <div>
               <form action="" id="form-sign-up" onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className={cx('input-wrapper')}>
                     <label htmlFor="">Địa chỉ Email</label>
                     <p>{email}</p>
                  </div>
                  <div className={cx('input-wrapper')}>
                     <ControllerForm form={form} name="password" label="Mật khẩu" required id="password" labelLarge>
                        <div>
                           <div className={cx('input')}>
                              <div className={cx('presentation')}>
                                 <input
                                    type={eye.password ? 'text' : 'password'}
                                    placeholder="Tạo mật khẩu"
                                    name="password"
                                    id="password"
                                    defaultValue={form.watch('password')}
                                 />
                              </div>
                           </div>
                           <span className={cx('input-icon')} onClick={() => handleSeePassword('password')}>
                              {eye.password ? <EyeIconText /> : <EyeIconPassword />}
                           </span>
                        </div>
                     </ControllerForm>
                  </div>
                  <div className={cx('input-wrapper')}>
                     <ControllerForm
                        form={form}
                        name="cfmPassword"
                        label="Nhập lại mật khẩu"
                        required
                        id="cfmPassword"
                        labelLarge
                     >
                        <div>
                           <div className={cx('input')}>
                              <div className={cx('presentation')}>
                                 <input
                                    type={eye.cfmPassword ? 'text' : 'password'}
                                    placeholder="Nhập lại mật khẩu"
                                    name="cfmPassword"
                                    defaultValue={form.watch('cfmPassword')}
                                 />
                              </div>
                           </div>
                           <span className={cx('input-icon')} onClick={() => handleSeePassword('cfmPassword')}>
                              {eye.cfmPassword ? <EyeIconText /> : <EyeIconPassword />}
                           </span>
                        </div>
                     </ControllerForm>
                  </div>
                  <div className={cx('legal-message')}>
                     <p>
                        Bằng việc đăng ký, tôi chấp nhận <Link>Điều khoản dịch vụ của Atlassian Cloud</Link> và công
                        nhận <Link>Chính sách quyền riêng tư</Link>
                     </p>
                  </div>
                  <div className={cx('button-submit')}>
                     <button type="submit">{loading ? <LoadingIcon /> : <span>Agree</span>}</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Verify;
