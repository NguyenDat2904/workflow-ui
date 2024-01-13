import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './ChangePassword.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Wrapper from '~/component/WrapperForm/Wrapper';
import HeaderSuffix from '~/component/HeaderSuffix/HeaderSuffix';
import { EyeIconPassword, EyeIconText, LoadingIcon, LogoIcon } from '~/component/icon/icon';
import AuthService from '~/services/auth/authServices';
const cx = classNames.bind(style);

const authService = new AuthService();

function ChangePassword() {
   const navigate = useNavigate();
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const { tokenUSer, id } = params;
   // 1. State
   const [password, setPassword] = useState('');
   const [eyePassword, setEyePassword] = useState(false);
   const [toggle, setToggle] = useState(false);

   // 2. Func
   const handleChange = (e) => {
      setPassword(e.target.value);
   };
   const handleSeePassword = () => {
      setEyePassword(!eyePassword);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (toggle === true) {
         return;
      }
      setToggle(true);
      const resetPassword = await authService.verifyChangePassword(id, password, tokenUSer);
      setToggle(false);
      if (resetPassword.status === 200) {
         navigate('/profile');
      }
   };

   return (
      <Wrapper>
         <section className={cx('main')}>
            <HeaderSuffix title="Chọn mật khẩu mới" />
            <form action="" onSubmit={handleSubmit}>
               <div className={cx('input-wrapper')}>
                  <div className={cx('input')}>
                     <div className={cx('presentation')}>
                        <input
                           type={eyePassword ? 'text' : 'password'}
                           placeholder="Nhập mật khẩu mới"
                           name="password"
                           value={password}
                           onChange={handleChange}
                        />
                     </div>
                  </div>
                  <span className={cx('input-icon')} onClick={() => handleSeePassword('cfmPassword')}>
                     {eyePassword ? <EyeIconText /> : <EyeIconPassword />}
                  </span>
               </div>
               <div className={cx('button-submit')}>
                  <button type="submit" className={cx(toggle && 'disable')}>
                     {toggle ? <LoadingIcon /> : <span>Tiếp tục</span>}
                  </button>
               </div>
            </form>
            <div className={cx('back')}>
               <Link>Bạn vẫn gặp vấn đề khi đăng nhập?</Link>
            </div>
            <footer>
               <div className={cx('page-footer')}>
                  <span>
                     <LogoIcon />
                  </span>
                  <div className={cx('txt')}>
                     Một tài khoản cho Jira, Confluence, Trello và <Link>sản phẩm khác.</Link>
                  </div>
               </div>
               <ul className={cx('support')}>
                  <li>
                     <Link>Liên hệ với bộ phận hỗ trợ</Link>
                  </li>
                  <p>•</p>
                  <li>
                     <Link>Lưu ý dành cho người dùng</Link>
                  </li>
                  <p>•</p>
                  <li>
                     <Link>Chính sách quyền riêng tư</Link>
                  </li>
               </ul>
            </footer>
         </section>
      </Wrapper>
   );
}

export default ChangePassword;
